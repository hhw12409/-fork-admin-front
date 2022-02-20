

import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme/default";
import { GlobalStyle } from "./globalStyle";

const GlobalThemeProvider: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={{ ...theme }}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};
export default GlobalThemeProvider;