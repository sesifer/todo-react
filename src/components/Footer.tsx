import React from "react";
import styled from "@emotion/styled";
import {fontSize} from "./theme/fonts";

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  font-size: ${fontSize.body};
  padding: 0 20px;
  text-align: center;
`;

const Footer = () => {

    return <FooterContainer>
        <p>©Copyright 2021 by Džu. All rights reversed. This was fun!</p>
    </FooterContainer>;
};

export default Footer;