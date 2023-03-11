import {
  BottomNavigation,
  Button,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useRouter } from "next/router";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Desktop, Mobile } from "../../../../Components/Helper";

import layoutcss from "@/styles/Layout1.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updatename } from "@/Services/CommonStore";
import {
  getRestaurentDetails,
  useGetRestaurentDetails,
} from "@/Services/BackendCall";
import { useEffect, useState } from "react";

const Reply = ({ children }) => {
  return (
    <Grid container justifyContent={"end"}>
      <Grid item xs={6} sm={3} textAlign="center">
        <Box className={layoutcss.replybox}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {children}
          </Typography>
        </Box>
      </Grid>
      <Grid item sm={2}></Grid>
    </Grid>
  );
};

const RestaurentName = ({ children }) => {
  return (
    <Grid container justifyContent="center">
      <Mobile>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: '"Tilt Prism", cursive',
            color: "wheat",
            paddingTop: 5,
          }}
        >
          {children}
        </Typography>
      </Mobile>
      <Desktop>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: '"Tilt Prism", cursive',
            color: "wheat",
            paddingTop: 10,
          }}
        >
          {children}
        </Typography>
      </Desktop>
    </Grid>
  );
};

const CustomeDivider = ({ children }) => {
  return (
    <Divider color="wheat">
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontFamily: '"Tilt Prism", cursive', color: "wheat" }}
      >
        {children}
      </Typography>
    </Divider>
  );
};

const Query = ({ children }) => {
  return (
    <Grid container justifyContent={"start"}>
      <Grid item sm={3}></Grid>
      <Grid item xs={6} sm={3} textAlign="center">
        <Box className={layoutcss.querybox}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontFamily: "'Oswald', sans-serif",
              textTransform: "capitalize",
            }}
          >
            {children}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const OpenMenuButton = ({ link }) => {
  const route = useRouter();
  return (
    <Grid container justifyContent={"center"}>
      <Mobile>
        <Button
          sx={{ color: "wheat", marginTop: 1, marginBottom: 5 }}
          variant="outlined"
          startIcon={<RestaurantMenuIcon />}
          fullWidth
          onClick={() => route.push(link)}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              fontFamily: "'Oswald', sans-serif",
              textTransform: "capitalize",
            }}
          >
            Open Menu
          </Typography>
        </Button>
      </Mobile>
      <Desktop>
        <Button
          sx={{ color: "wheat", marginTop: 5, marginBottom: 10 }}
          variant="outlined"
          startIcon={<RestaurantMenuIcon />}
          onClick={() => route.push(link)}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              fontFamily: "'Oswald', sans-serif",
              textTransform: "capitalize",
            }}
          >
            Open Menu
          </Typography>
        </Button>
      </Desktop>
    </Grid>
  );
};

const ButtonHref = ({ title, link }) => {
  const route = useRouter();
  return (
    <Button
      onClick={() => route.push(link)}
      variant="outlined"
      sx={{ padding: 0 }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontFamily: "'Oswald', sans-serif", color: "black" }}
      >
        {title}
      </Typography>
    </Button>
  );
};

const ContactUs = ({ address, phoneNumbers, socialMedia }) => {
  return (
    <>
      {(address !== undefined ||
        phoneNumbers !== undefined ||
        socialMedia !== undefined) && (
        <CustomeDivider> * Contact Us *</CustomeDivider>
      )}

      {address !== undefined && (
        <>
          <Query>Address</Query>
          <Reply>{address}</Reply>
        </>
      )}

      {phoneNumbers !== undefined && (
        <>
          <Query>Phone number </Query>
          {phoneNumbers.map((number, index) => (
            <Reply key={index}>{number}</Reply>
          ))}
        </>
      )}

      {socialMedia !== undefined && (
        <>
          <Query>Are you available on social Media</Query>
          {socialMedia.map((social, index) => (
            <Reply key={index}>
              <ButtonHref link={social.link} title={social.site} />
            </Reply>
          ))}
        </>
      )}
    </>
  );
};

const MenuHomePage = () => {
  const router = useRouter();
  // const [restDetails, setRestDetails] = useState();
  const useGetRestaurent = useGetRestaurentDetails();
  const { appDetails: restDetails } = useSelector((sl) => sl.app);
  useEffect(() => {
    useGetRestaurent.fetchApiDetails(router.query.menuId);
  }, [router.query.menuId]);

  if (restDetails === null) {
    return <>Someting went wrong</>;
  }

  return (
    <Box>
      <Container>
        <RestaurentName>{restDetails.restaurentName}</RestaurentName>
        <OpenMenuButton link={restDetails.OpenMenuLink} />
      </Container>
      <Mobile>
        <Container>
          <ContactUs
            address={restDetails.contact.address}
            phoneNumbers={restDetails.contact.phoneNumbers}
            socialMedia={restDetails.contact.socialMedia}
          ></ContactUs>
        </Container>
      </Mobile>
      <Desktop>
        <Container>
          <ContactUs
            address={restDetails.contact.address}
            phoneNumbers={restDetails.contact.phoneNumbers}
            socialMedia={restDetails.contact.socialMedia}
          ></ContactUs>
        </Container>
      </Desktop>
    </Box>
  );
};

export default MenuHomePage;
