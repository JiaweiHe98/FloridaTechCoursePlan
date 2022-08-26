import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box, Typography, Divider, Avatar } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { RenderRow } from '../courseList/virtualizedList/SectionList';
import { DimensionContext } from '../context/DimensionContext';
// import CartSelector from './CartSelector';

const CartList = ({ headerHeight }) => {
  const [cart, setCart] = useContext(CartContext);
  const dimensions = useContext(DimensionContext);
  const [tabHeight, setTabHeight] = useState(0);
  const tabRef = useRef();

  useEffect(() => {
    if (tabRef) {
      setTabHeight(tabRef.current.offsetHeight);
    }
  }, [dimensions]);

  let creditsMin = 0;
  let creditsMax = 0;

  cart.forEach((course) => {
    creditsMin += +course.sectionDetail.cr[0];
    creditsMax += +course.sectionDetail.cr[1];
  });

  const onRemoveFromCart = (crn) => {
    setCart(cart.filter((course) => course.sectionDetail.crn !== crn));
  };

  const renderCourses = () => {
    let isFirst = true;
    let isFirst2 = false;

    const height = dimensions.height - headerHeight - tabHeight - 1;

    return (
      <Box
        className="none-scroll-list"
        sx={{
          flexGrow: 1,
          height: height,
          maxHeight: height,
          overflow: 'scroll',
        }}
      >
        {cart &&
          cart.map((course, index) => {
            if (isFirst) {
              isFirst = false;
              isFirst2 = true;
            } else {
              isFirst2 = false;
            }

            return (
              <RenderRow
                key={index}
                prefix={course.prefix}
                suffix={course.suffix}
                sectionName={course.sectionName}
                sectionDetail={course.sectionDetail}
                onAddCourseToCart={null}
                onRemoveFromCart={onRemoveFromCart}
                isFirst={isFirst2}
              />
            );
          })}
      </Box>
    );
  };

  return (
    <>
      <Box
        ref={tabRef}
        sx={{
          height: 48,
          display: 'flex',
          alignItems: 'center',
          pl: '1rem',
          pr: '1rem',
        }}
      >
        <Box>
          <Typography variant="h6">Cart</Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'right',
          }}
        >
          {creditsMax === creditsMin ? (
            <Typography variant="subtitle">
              Total credits: {creditsMin}
            </Typography>
          ) : (
            <>
              <Typography variant="subtitle">
                Total credits: {creditsMin}
                {' - '} {creditsMax}
              </Typography>
            </>
          )}
        </Box>
        {/* <Box sx={{ pl: '1rem' }}>
          <CartSelector />
        </Box> */}
      </Box>
      <Divider />
      {cart.length > 0 ? (
        renderCourses()
      ) : (
        <Box
          sx={{
            height: 'calc(100% - 49px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box>
            <Avatar
              sx={{ width: 180, height: 180 }}
              alt="logo"
              src="/cart.svg"
            />
          </Box>
          <Box sx={{ p: '2rem', textAlign: 'center' }}>
            <Typography variant="body1">Your cart is empty.</Typography>
            <Typography variant="body1">
              Click 'ADD TO CART' button in a section's dropdown menu to add a
              course.
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CartList;
