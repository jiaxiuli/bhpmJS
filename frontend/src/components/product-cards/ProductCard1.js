import { Box, Dialog, DialogContent, IconButton, styled } from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  postMyCollection,
  removeMyCollection,
} from "../../redux/slice/myCollectionSlice";
import { useDispatch, useSelector } from "react-redux";

import BazarCard from "../BazarCard";
import Close from "@mui/icons-material/Close";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FlexBox from "../FlexBox";
import { H3 } from "../Typography";
import { Link } from "react-router-dom";

const StyledBazarCard = styled(BazarCard)(() => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  margin: "auto",
  overflow: "hidden",
  transition: "all 250ms ease-in-out",
  borderRadius: "8px",
  "&:hover": {
    "& .css-1i2n18j": {
      display: "flex",
    },
  },
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));
const HoverIconWrapper = styled(Box)(({ theme }) => ({
  // display: "none",
  flexDirection: "column",
  position: "absolute",
  top: "7px",
  right: "15px",
  cursor: "pointer",
  zIndex: 2,
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

const ProductCard1 = ({
  id,
  title,
  price,
  startingPrice,
  imgUrl,
  isFav,
  hoverEffect,
  lotNum,
}) => {
  const [isFavorite, setIsFavorite] = useState(isFav || false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const { state, dispatch } = useAppContext();
  // const cartItem = state.cart.cartList.find((item) => item.id === id);
  const { username } = useSelector((state) => state.userAuth.user);
  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);
  console.log();

  const toggleIsFavorite = async () => {
    setIsFavorite((fav) => !fav);
    console.log(isFavorite);
    if (isFavorite === false) {
      const createMyCollectionInput = {
        id: username + id,
        lotsID: id,
      };
      dispatch(postMyCollection({ createMyCollectionInput }));
    } else {
      dispatch(removeMyCollection({ id: username + id }));
    }
  };

  return (
    <StyledBazarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        <HoverIconWrapper>
          <IconButton
            sx={{
              p: "0px",
            }}
            onClick={toggleIsFavorite}
          >
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
        </HoverIconWrapper>
        <Link to={`/lots/${id}`}>
          <img
            src={imgUrl}
            // maxWidth={300}
            height={275}
            layout="responsive"
            alt={title}
          />
        </Link>
      </ImageWrapper>

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link to={`/product/${id}`}>
              <H3
                className="title"
                fontSize="14px"
                textAlign="left"
                fontWeight="600"
                color="text.secondary"
                mb={1}
                title={title}
              >
                Lot #{lotNum} {title}
              </H3>
            </Link>

            <FlexBox alignItems="center" mt={0.5}>
              <Box pr={1} fontWeight="600" color="primary.second">
                估價: ${startingPrice.toFixed(2)} - ${price.toFixed(2)}
              </Box>
            </FlexBox>
            {/* <FlexBox alignItems="center" mt={0.5}>
              <Box pr={1} fontWeight="600" color="primary.main">
                預計成交價: ${price.toFixed(2)}
              </Box>
            </FlexBox> */}
          </Box>
        </FlexBox>
      </ContentWrapper>

      <Dialog open={open} maxWidth={false} onClose={toggleDialog}>
        <DialogContent
          sx={{
            paddingBottom: "1.25rem",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
            }}
            onClick={toggleDialog}
          >
            <Close className="close" fontSize="small" color="primary" />
          </IconButton>
        </DialogContent>
      </Dialog>
    </StyledBazarCard>
  );
};

export default ProductCard1;
