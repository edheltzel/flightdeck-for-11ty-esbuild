/**
 * @file This is the main entry point for the application. It imports and initializes Alpine.js and VGSCursor.
 * @requires module:alpinejs
 * @requires module:./modules/visualGuidanceSystem/vgs-cursor.js
 */

//import { VGSCursor } from "./modules/visualGuidanceSystem/vgs-cursor.js";
import Alpine from "alpinejs";

// Assigning Alpine to the global window object
window.Alpine = Alpine;

Alpine.start();

// VGSCursor();
