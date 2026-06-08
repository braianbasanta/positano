import { Composition } from "remotion";
import { MenuReel, menuReelDuration } from "./MenuReel/MenuReel";
import { menuDelDia } from "../src/data/menuDelDia";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MenuReel"
      component={MenuReel}
      durationInFrames={menuReelDuration(menuDelDia)}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ data: menuDelDia }}
    />
  );
};
