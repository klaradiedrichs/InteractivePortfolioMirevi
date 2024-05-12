import { useStore } from '../stores/useStore';
import { useState , useEffect} from 'react'
import projectsData from '../projectinformation.json';
import useGameStore from "../wdr/useGameStore";
import '../index.css'
import linksvgWhite from '/svgs/linkiconWhite.svg';
import '../index.css'
import {Environment, OrbitControls, useAnimations, Html, PerspectiveCamera } from '@react-three/drei'


export default function Overlay() {

    return (
        <>
        <Html>
        <div className="loadingScene" tabIndex={0}>
            Loading
         
           
        </div>
        </Html>
        </>
    )
  }
