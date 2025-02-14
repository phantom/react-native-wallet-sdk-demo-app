// It's not clear if we need this in the or the sdk itself, as we polyfill it in mobile
// Our sdk may need it polyfilled, if we can't polyfill it ourselves
import "react-native-get-random-values";
import "./setupPolyfill";

import { registerRootComponent } from "expo";

import App from "./App";

/**
 * DEMO APP Entry Point
 *
 * This is entry point for the demo app.
 */
registerRootComponent(App);
