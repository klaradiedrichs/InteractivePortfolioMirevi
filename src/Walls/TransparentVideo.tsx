// import { useEffect, useRef, useState } from "react";
// import { vertexShader, fragmentShader } from "../Shader.ts";
// import { Canvas, useThree } from "@react-three/fiber";
// import styled from "styled-components";
// import { VideoTexture } from "three";
// import React from "react";
// import { Environment } from "@react-three/drei";

// //types
// type TVideo = HTMLVideoElement | null;
// interface IVideoComponentProps {
//   video: TVideo;
// }
// interface ITransparentVideoProps {
//   filePath: string;
// }

// // video mesh
// const VideoComponent = ({ video }: IVideoComponentProps) => {
//   if (video === null) return null;

//   const videoTexture = new VideoTexture(video);
//   const uniforms = {
//     uTexture: { value: videoTexture },
//   };
//   const { width, height } = useThree((state) => state.viewport);

//   return (
//     <>
//     <Environment preset="sunset" background blur={0.3} />
//     <mesh>
//         <planeGeometry args={[11, 7, 1]} />
//         <shaderMaterial
//             uniforms={uniforms}
//             vertexShader={vertexShader}
//             fragmentShader={fragmentShader} />
//       </mesh>
     
//       </>
//   );
// };

// // component
// const TransparentVideo = ({ filePath }: ITransparentVideoProps) => {
//   const videoRef = useRef<TVideo>(null);
//   const [isVideoReady, setIsVideoReady] = useState(false);

//   useEffect(() => {
//     if (videoRef) {
//       setIsVideoReady(true);
//     }
//   }, [videoRef]);

//   return (
//       <>
//       <Video
//       src={filePath}
//       ref={videoRef}
//       autoPlay={true}
//       muted={true}
//       loop={true}>
//       </Video>
//       <Canvas gl={{ antialias: false }}>
//         {isVideoReady && <VideoComponent video={videoRef.current} />}
//       </Canvas>
//       </>
//   );
// };

// export default TransparentVideo;

// const Video = styled.video`
//   width: 0;
//   opacity: 0;
// `;


