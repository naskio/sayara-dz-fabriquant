import {createMuiTheme} from "@material-ui/core";
import {purple, amber} from "@material-ui/core/colors";
import theme from "./theme";

export default createMuiTheme({
    palette: {
        primary: {
            main: theme.COLORS.PRIMARY,
            // contrastText: '#fff',
            // light: '#fff',
            // dark: '#fff',
        },
        secondary: {
            main: amber[500],
        },
        white: {
            main: '#fff',
        }
    },
});
