import {setConfigAction} from "../actions/config";

export const setTitle = (title) => setConfigAction({title});

export const setIsLoaded = (isLoaded) => setConfigAction({isLoaded});
