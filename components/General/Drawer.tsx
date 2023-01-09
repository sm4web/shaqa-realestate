import React, { useState } from "react";
import {
  createStyles,
  Drawer,
  Group,
  Navbar,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";

import {
  Ad,
  Heart,
  Home2,
  Icon as TablerIcon,
  Logout,
  Settings,
} from "tabler-icons-react";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/auth/authSlice";

import { useRouter } from "next/router";

import { toggleDrawer } from "../../features/drawer/drawerSlice";
import { Box } from "@mui/material";

import { images } from "../../constants";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  navbar: {
    height: "fit-content",
  },

  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2C4CC9",
    "&:hover": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    backgroundColor: "#2C4CC9 !important",
    color: "#fff !important",
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const SideNav = () => {
  const [active, setActive] = useState(0);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const opened = useSelector((state: any) => state.drawer.opened);
  const { user } = useSelector((state: any) => state.auth.data);

  const mockdata = [
    { icon: Home2, label: "Home", href: "/", q: {} },
    { icon: Heart, label: "Favorites", href: "/favorites", q: {} },
    { icon: Ad, label: "My Ads", href: "/my-ads", q: { uid: user?.id } },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      q: { setting: "profile", uid: user?.id },
    },
  ];
  const onSignOut = () => {
    dispatch(logout(0));
    dispatch(toggleDrawer(0));
  };

  const links = mockdata.map((link, index) => (
    <Box
      onClick={() => {
        setActive(index);
        dispatch(toggleDrawer(0));
        router.push({
          pathname: link.href,
          query: link.q,
        });
      }}
      display={"flex"}
      alignItems={"center"}
      key={link.label}
      gap={2}
    >
      <NavbarLink {...link} key={link.label} active={index === active} />
      <h3
        style={{
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        {link.label}
      </h3>
    </Box>
  ));

  return (
    <Drawer
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.33}
      overlayBlur={3}
      opened={opened}
      aria-labelledby="drawer-title"
      aria-describedby="drawer-body"
      closeButtonLabel="Close drawer"
      onClose={() => {
        dispatch(toggleDrawer(0));
      }}
    >
      <Navbar className={classes.navbar}>
        <Navbar.Section>
          <Group
            align="start"
            spacing={60}
            style={{ maxWidth: "50%", margin: "auto" }}
          >
            <Image
              src={images.logoDark}
              width={120}
              style={{ margin: "auto" }}
              alt="Shaqa - شقه"
            />
            {links}
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <NavbarLink onClick={onSignOut} icon={Logout} label="Logout" />
              <h3
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                Logout
              </h3>
            </Box>
          </Group>
        </Navbar.Section>
      </Navbar>
    </Drawer>
  );
};

export default SideNav;
