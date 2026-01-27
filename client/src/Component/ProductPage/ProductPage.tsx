import { StarFilled } from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Rate,
  Typography,
  theme,
} from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IAuth, IReview } from '../../types/types';
import API from '../../utility/API';
import { REVIEW_ENDPOINTS } from '../../utility/Constants/END_POINTS';
import { useAppSelector } from '../../utility/Hooks/Redux/hooks';
import './ProductPage.scss';

const { Text, Title } = Typography;

interface IState {
  i: IReview;
  firstName: string;
  lastName: string;
}

interface IInput {
  star: number;
  comment: string;
}
const ProductPage = () => {
  const { token } = theme.useToken();
  const { id } = useParams();
  const [reviewData, setReviewData] = useState<IReview[]>([]);
  const [length, setLength] = useState<boolean>(false);

  const [user, setUser] = useState<IAuth[]>([]);
  const [input, setInput] = useState<IInput>({
    star: 0,
    comment: '',
  });

  const allOredrs = useAppSelector((state) => state.order.allOrderItem);

  const userOrder = allOredrs.reduce((acc: number[], item) => {
    const temp = item.items.map(({ productId }) => productId);
    acc = [...acc, ...temp];
    return acc;
  }, []);

  const isBought = userOrder.find((productId) => id && productId === +id);
  const allProductData = useAppSelector((state) => state.product.allProducts);
  const authID = useAppSelector((state) => state.auth.id);
  const currantProduct = allProductData.find((item) => id && item.id === +id);
  const Rating = (value: number) => {
    setInput((prevInput) => ({
      ...prevInput,
      rate: value,
    }));
  };
  const isAlreadyCommented = reviewData.find((a) => a.userId === authID);

  const comment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput((prevInput) => ({
      ...prevInput,
      comment: e.target.value,
    }));
  };

  const allreviewDetails: IState[] = reviewData.flatMap((i) => {
    const userDetails = user.find(({ id: authId }) => authId === i.userId);
    if (userDetails) {
      return {
        i,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      };
    } else {
      return [];
    }
  });

  const fetchData = async () => {
    try {
      const { data } = await API.get<IReview[]>(
        REVIEW_ENDPOINTS.GET_REVIEWS(id as string)
      );
      setReviewData(data);
      setLength(true);

      const { data: userData } = await API.get<IAuth[]>('/users');
      setUser(userData);
    } catch (error) {
      console.log('error ===>', error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  const onFinish = async (value: IInput) => {
    setInput(value);
    const reviewDetails: IReview = {
      comment: input.comment,
      star: input.star,
      userId: authID,
      productId: id ? +id : 0,
    };
    const { data: addedReview } = await API.post<IReview>(
      REVIEW_ENDPOINTS.ADD_REVIEWS,
      reviewDetails
    );
    setReviewData((prev) => [...prev, addedReview]);
  };

  return (
    <div className='product-page-conatiner'>
      <Card style={{ marginTop: '20px' }}>
        <div className='productCard-container'>
          <div className='img-container'>
            <img
              alt='example'
              src='/icons/watch.jpg'
            />
          </div>
          <div className='product-details-part'>
            <Title level={3}>{currantProduct?.title}</Title>
            <Text type='secondary'>{currantProduct?.description}</Text>
            <Rate
              allowHalf
              disabled
              style={{ color: token.colorPrimary }}
              character={<StarFilled />}
              defaultValue={currantProduct?.rating}
            />
            <Text strong> ${currantProduct?.price}</Text>
            <div>
              <Text
                strong
                style={{ fontSize: '15px' }}
              >
                brand:
              </Text>

              <Text
                type='secondary'
                style={{ fontSize: '15px' }}
              >
                {currantProduct?.brand}
              </Text>
            </div>
            <div>
              <Text
                strong
                style={{ fontSize: '15px' }}
              >
                categories:
              </Text>

              <Text
                type='secondary'
                style={{ fontSize: '15px' }}
              >
                {currantProduct?.category}
              </Text>
            </div>
          </div>
        </div>
      </Card>
      {length && !isAlreadyCommented && isBought && (
        <Card style={{ marginTop: '20px' }}>
          <Form onFinish={onFinish}>
            <Form.Item
              label='Rating'
              name='rate'
            >
              <Rate
                allowHalf
                onChange={Rating}
                value={input.star}
              />
            </Form.Item>
            <Form.Item
              label='Comment'
              name='comment'
            >
              <Input.TextArea
                rows={4}
                onChange={comment}
                value={input.comment}
              />
            </Form.Item>

            <Button
              htmlType='submit'
              style={{ width: 'fit-content' }}
              type='primary'
            >
              Submit
            </Button>
          </Form>
        </Card>
      )}
      <Card>
        {allreviewDetails.length !== 0 && (
          <div>
            <Title level={3}>Reviews</Title>
            <Divider />
            {allreviewDetails.map((detail: IState) => (
              <div key={detail.i.id}>
                <div className='review-card'>
                  <div className='star-comment'>
                    <Badge
                      style={{
                        background: 'red',
                        borderRadius: '10px',
                        color: 'white',
                        padding: '5px',
                      }}
                      count={
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <StarFilled />
                          {detail.i.star}
                        </div>
                      }
                    />
                    <Text type='secondary'>{detail.i.comment}</Text>
                  </div>
                  <div className='fullName'>
                    <Text type='secondary'>{detail.firstName}</Text>
                    <Text type='secondary'>{detail.lastName}</Text>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductPage;
