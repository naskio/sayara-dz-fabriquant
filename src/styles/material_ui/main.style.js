import {createMuiTheme} from "@material-ui/core";
import {purple, amber} from "@material-ui/core/colors";
// import theme from "../theme";

export default createMuiTheme({
    palette: {
        primary: {
            // main: theme.COLORS.PRIMARY,
            // main: purple[500],
            main: '#632365',
            // contrastText: '#fff',
            // light: '#fff',
            // dark: '#fff',
        },
        secondary: {
            main: amber[500],
        },
        primaryText: {
            main: purple[500],
        }
    },
});
