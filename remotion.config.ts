// Configuración de Remotion para los reels de Positano.
// Studio:  npm run reels
// Render:  npm run reels:render
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setEntryPoint("./remotion/index.ts");
