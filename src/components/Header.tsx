import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styled from "@emotion/styled";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import {AccountCircle, School, ContactMail, GitHub, Link as LinkIcon, Menu as MenuIcon} from "@mui/icons-material";
import {Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import {DarkModeToggle} from "../themes/DarkModeToggle";
import {useTheme} from "../themes/theme-context";
import {css} from "@emotion/react";
import { useTheme as muiTheme } from "@mui/material/styles";


const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 0 16px;
  height: 58px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? css`
              background-color: #F2F2F2;
            ` : css`
              background-color: rgb(22, 27, 34);
            `
  }}
  border-bottom: 1px solid grey;
  color: #fff;
`;

const StyledLink = styled(Link)`
  width: 150px;
  border: 1px solid grey !important;  // adds a grey border around the sides and top of the button
  border-bottom: none !important;
  ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? css`
      &.Mui-selected {
        background-color: inherit;
        color: #000 !important;  // use the !important flag to give this style higher precedence
        border-bottom : 2px solid #1D9BF0 !important; // adds the indicator
      }
    ` : css`
      &.Mui-selected {
        background-color: inherit;
        color: #fff !important;  // use the !important flag to give this style higher precedence
        border-bottom : 2px solid #1D9BF0 !important; // adds the indicator
      }
    `
  }}

  ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? css`
              &:hover {
                background-color: #EAEDF1;
              }
            ` : css`
    &:hover {
        background-color: #161A20;
      }
    `
  }}
`

const LanguageMenuItem = styled(MenuItem)`
  width: 200px;
`;

const StyledHeader = styled.header`
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  padding-bottom: 15px;
  font-family: Cursive,serif;
  color: ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? '#000'
            : '#fff'
  }};
`;

const StyledDrawer = styled.div`
  flex-shrink: 0;
  width: 250px;
  height: 1000px;
  padding: 16px;
  background-color: ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? '#fff'
            : '#161B22'
  }};
`;


const Header = () => {
    const [, setValue] = React.useState<string>('about')
    const [languageMenuAnchor, setLanguageMenuAnchor] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const location = useLocation()
    const tabOpened = location === null ? 'about' : location.pathname.replace('/', '')
    const theme = muiTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    }

    const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setLanguageMenuAnchor(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setLanguageMenuAnchor(null);
    };

    const handleLanguageChange = (language: string)  => {
        i18n.changeLanguage(language)
        handleLanguageMenuClose();
    };

    return (
      <HeaderWrapper>
        <StyledHeader>{process.env.REACT_APP_AUTHOR_NAME} Portfolio</StyledHeader>
          {isMobile ? 
                <>
                <IconButton onClick={handleDrawerOpen} style={{ marginRight: '10px' }}>
                    <MenuIcon style={{ fontSize: '37px' }} />
                </IconButton>
                <Drawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={handleDrawerClose}
                >
                    <StyledDrawer>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <List>
                                <ListItem button component={Link} to="/about" onClick={handleDrawerClose}>
                                    <ListItemIcon><AccountCircle /></ListItemIcon>
                                    <ListItemText primary={t('menu_about')} />
                                </ListItem>
                                <ListItem button component={Link} to="/education" onClick={handleDrawerClose}>
                                    <ListItemIcon><School /></ListItemIcon>
                                    <ListItemText primary={t('menu_education')} />
                                </ListItem>
                                <ListItem button component={Link} to="/github" onClick={handleDrawerClose}>
                                    <ListItemIcon><GitHub /></ListItemIcon>
                                    <ListItemText primary={"Github"} />
                                </ListItem>
                                <ListItem button component={Link} to="/contact" onClick={handleDrawerClose}>
                                    <ListItemIcon><ContactMail /></ListItemIcon>
                                    <ListItemText primary={t('menu_contact')} />
                                </ListItem>
                                <ListItem button component={Link} to="/links" onClick={handleDrawerClose}>
                                    <ListItemIcon><LinkIcon /></ListItemIcon>
                                    <ListItemText primary={t('menu_links')} />
                                </ListItem>
                            </List>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <DarkModeToggle/>
            <IconButton color="secondary" onClick={handleLanguageMenuOpen} style={{ marginBottom : '10px' }}>
                <LanguageIcon style={{ fontSize: '37px' }}/>
            </IconButton>
            <Menu
                anchorEl={languageMenuAnchor}
                keepMounted
                open={Boolean(languageMenuAnchor)}
                onClose={handleLanguageMenuClose}
            >
                <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>Finnish</LanguageMenuItem>
                <LanguageMenuItem onClick={() => handleLanguageChange('en')}>English</LanguageMenuItem>
            </Menu>
                </div>
                </StyledDrawer>
                </Drawer>
            </>
 : <BottomNavigation
              value={tabOpened}
              onChange={handleChange}
              showLabels
              style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center' }}
          >
              <BottomNavigationAction
                  component={StyledLink}
                  to="/about"
                  label={t('menu_about')}
                  value="about"
                  icon={<AccountCircle />}
              />
              <BottomNavigationAction
                  component={StyledLink}
                  to="/education"
                  value="education"
                  label={t('menu_education')}
                  icon={<School />}
              />
              <BottomNavigationAction
                  component={StyledLink}
                  to="/github"
                  value="github"
                  label={'GitHub'}
                  icon={<GitHub />}
              />
              <BottomNavigationAction
                  component={StyledLink}
                  to="/contact"
                  value="contact"
                  label={t('menu_contact')}
                  icon={<ContactMail />}
              />
              <BottomNavigationAction
                  component={StyledLink}
                  to="/links"
                  value="links"
                  label={t('menu_links')}
                  icon={<LinkIcon />}
              />
          </BottomNavigation>}
          {!isMobile ?
        <div>           
          <DarkModeToggle/>
          <IconButton color="secondary" onClick={handleLanguageMenuOpen} style={{ marginBottom : '10px' }}>
              <LanguageIcon />
          </IconButton>
          <Menu
              anchorEl={languageMenuAnchor}
              keepMounted
              open={Boolean(languageMenuAnchor)}
              onClose={handleLanguageMenuClose}
          >
              <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>Finnish</LanguageMenuItem>
              <LanguageMenuItem onClick={() => handleLanguageChange('en')}>English</LanguageMenuItem>
          </Menu> 
          </div> : <div/>}
      </HeaderWrapper>
  );
}

export default Header;