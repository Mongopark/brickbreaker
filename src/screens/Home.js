import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
} from "react-native";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Constants from "../components/Constants";
import Physics from "../components/Physics";
import Racket from "../components/Racket";
import Ball from "../components/Ball";
import BrickRenderer from "../components/BrickRenderer";
import Wall from "../components/Wall";
import heart from "../../assets/heart.png";
import { Ionicons } from "@expo/vector-icons";
import colors from "../layouts/colors";
import fonts from "../layouts/fonts";
import Button from "../components/Button";
import Modal from './Modal';
import { AntDesign } from "@expo/vector-icons";
//import the two below for context check if they have been previously imported and recheck if the location is correct
import { AllProvider, AllContext } from "../context/AllContext";
import { AuthProvider, AuthContext } from "../context/AuthContext";

const App = ({ navigation }) => {
  // const [isGamePaused, setIsGamePaused] = useState(false);
  const [paused, setPaused] = useState(true);
  const [running, setRunning] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const gameEngineRef = useRef();
  const entities = useRef(setupWorld());  
  const [score, setScore] = useState(0);
      //list the items you need in the context
      const {level, setLevel, lives, setLives, totalscore, setTotalscore } = useContext(AllContext);
      const {
        username, setUsername, email, setEmail, password, setPassword, isLoading, setIsLoading, userInfo, setUserInfo,
        // register,
        // Userlogin,
        // logout,       
        isLoggedIn,
        AddLeader, } = useContext(AuthContext);



  const moveRacketLeft = () => {
    const newRacketX = entities.current.racket.body.position.x - 40;
    if (newRacketX >= Constants.RACKET_MIN_X_POSITION) {
      Matter.Body.setPosition(entities.current.racket.body, {
        x: newRacketX,
        y: entities.current.racket.body.position.y,
      });
    }
  };

  const moveRacketRight = () => {
    const newRacketX = entities.current.racket.body.position.x + 40;
    if (newRacketX <= Constants.RACKET_MAX_X_POSITION) {
      Matter.Body.setPosition(entities.current.racket.body, {
        x: newRacketX,
        y: entities.current.racket.body.position.y,
      });
    }
  };

// this is what we used in breaking the bricks
  const moveBrick1 = () => {    
      Matter.Body.setPosition(entities.current.brick1.body, { x:  120, y:  748, });
      Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
      setScore(score + 1);
      setTotalscore(totalscore + 1);
  };
  const moveBrick2 = () => {
    Matter.Body.setPosition(entities.current.brick2.body, { x: 120, y: 750 });
    Matter.Body.setVelocity(entities.current.ball.body, {
      x: entities.current.ball.body.velocity.x,
      y: entities.current.ball.body.velocity.y,
    });
    setScore(score + 1);
    setTotalscore(totalscore + 1);
};
const moveBrick3 = () => {    
  Matter.Body.setPosition(entities.current.brick3.body, { x:  120, y:  752, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick4 = () => {    
  Matter.Body.setPosition(entities.current.brick4.body, { x:  120, y:  754, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick5 = () => {    
  Matter.Body.setPosition(entities.current.brick5.body, { x:  120, y:  756, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick6 = () => {    
  Matter.Body.setPosition(entities.current.brick6.body, { x:  120, y:  758, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick7 = () => {    
  Matter.Body.setPosition(entities.current.brick7.body, { x:  120, y:  760, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick8 = () => {    
  Matter.Body.setPosition(entities.current.brick8.body, { x:  120, y:  762, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick9 = () => {    
  Matter.Body.setPosition(entities.current.brick9.body, { x:  120, y:  764, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick10 = () => {    
  Matter.Body.setPosition(entities.current.brick10.body, { x:  120, y:  766, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick11 = () => {    
  Matter.Body.setPosition(entities.current.brick11.body, { x:  120, y:  768, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick12 = () => {    
  Matter.Body.setPosition(entities.current.brick12.body, { x:  120, y:  770, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick13 = () => {    
  Matter.Body.setPosition(entities.current.brick13.body, { x:  120, y:  772, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick14 = () => {    
  Matter.Body.setPosition(entities.current.brick14.body, { x:  120, y:  774, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick15 = () => {    
  Matter.Body.setPosition(entities.current.brick15.body, { x:  120, y:  776, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick16 = () => {    
  Matter.Body.setPosition(entities.current.brick16.body, { x:  120, y:  778, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick17 = () => {    
  Matter.Body.setPosition(entities.current.brick17.body, { x:  120, y:  780, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick18 = () => {    
  Matter.Body.setPosition(entities.current.brick18.body, { x:  120, y:  782, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick19 = () => {    
  Matter.Body.setPosition(entities.current.brick19.body, { x:  120, y:  784, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick20 = () => {    
  Matter.Body.setPosition(entities.current.brick20.body, { x:  120, y:  786, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick21 = () => {    
  Matter.Body.setPosition(entities.current.brick21.body, { x:  120, y:  788, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick22 = () => {    
  Matter.Body.setPosition(entities.current.brick22.body, { x:  120, y:  790, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick23 = () => {    
  Matter.Body.setPosition(entities.current.brick23.body, { x:  120, y:  792, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick24 = () => {    
  Matter.Body.setPosition(entities.current.brick24.body, { x:  120, y:  796, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick25 = () => {    
  Matter.Body.setPosition(entities.current.brick25.body, { x:  120, y:  798, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick26 = () => {    
  Matter.Body.setPosition(entities.current.brick26.body, { x:  120, y:  800, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick27 = () => {    
  Matter.Body.setPosition(entities.current.brick27.body, { x:  120, y:  802, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick28 = () => {    
  Matter.Body.setPosition(entities.current.brick28.body, { x:  120, y:  804, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick29 = () => {    
  Matter.Body.setPosition(entities.current.brick29.body, { x:  120, y:  806, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick30 = () => {    
  Matter.Body.setPosition(entities.current.brick30.body, { x:  120, y:  808, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick31 = () => {    
  Matter.Body.setPosition(entities.current.brick31.body, { x:  120, y:  810, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick32 = () => {    
  Matter.Body.setPosition(entities.current.brick32.body, { x:  120, y:  812, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick33 = () => {    
  Matter.Body.setPosition(entities.current.brick33.body, { x:  120, y:  814, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick34 = () => {    
  Matter.Body.setPosition(entities.current.brick34.body, { x:  120, y:  816, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick35 = () => {    
  Matter.Body.setPosition(entities.current.brick35.body, { x:  120, y:  818, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};
const moveBrick36 = () => {    
  Matter.Body.setPosition(entities.current.brick36.body, { x:  120, y:  820, });
  Matter.Body.setVelocity(entities.current.ball.body, { x: entities.current.ball.body.velocity.x, y: entities.current.ball.body.velocity.y });
  setScore(score + 1);
  setTotalscore(totalscore + 1);
};

  function setupWorld() {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0;

    let racket = Matter.Bodies.rectangle(
      Constants.RACKET_START_X_POSITION,
      Constants.RACKET_Y_POSITION,
      Constants.RACKET_WIDTH,
      Constants.RACKET_HEIGHT,
      { isStatic: true }
    );
    let brick1 = Matter.Bodies.rectangle(
      50,
      80,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick1.label = "brick1";
    let brick2 = Matter.Bodies.rectangle(
      100,
      80,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick2.label = "brick2";
    let brick3 = Matter.Bodies.rectangle(
      150,
      80,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick3.label = "brick3";
    let brick4 = Matter.Bodies.rectangle(
      200,
      80,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick4.label = "brick4";
    let brick5 = Matter.Bodies.rectangle(
      250,
      80,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick5.label = "brick5";
    let brick6 = Matter.Bodies.rectangle(
      300,
      80,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick6.label = "brick6";
    let brick7 = Matter.Bodies.rectangle(
      50,
      100,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick7.label = "brick7";
    let brick8 = Matter.Bodies.rectangle(
      100,
      100,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick8.label = "brick8";
    let brick9 = Matter.Bodies.rectangle(
      150,
      100,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick9.label = "brick9";
    let brick10 = Matter.Bodies.rectangle(
      200,
      100,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick10.label = "brick10";
    let brick11 = Matter.Bodies.rectangle(
      250,
      100,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick11.label = "brick11";
    let brick12 = Matter.Bodies.rectangle(
      300,
      100,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick12.label = "brick12";
    let brick13 = Matter.Bodies.rectangle(
      50,
      120,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick13.label = "brick13";
    let brick14 = Matter.Bodies.rectangle(
      100,
      120,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick14.label = "brick14";
    let brick15 = Matter.Bodies.rectangle(
      150,
      120,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick15.label = "brick15";
    let brick16 = Matter.Bodies.rectangle(
      200,
      120,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick16.label = "brick16";
    let brick17 = Matter.Bodies.rectangle(
      250,
      120,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick17.label = "brick17";
    let brick18 = Matter.Bodies.rectangle(
      300,
      120,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick18.label = "brick18";
    let brick19 = Matter.Bodies.rectangle(
      50,
      140,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick19.label = "brick19";
    let brick20 = Matter.Bodies.rectangle(
      100,
      140,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick20.label = "brick20";
    let brick21 = Matter.Bodies.rectangle(
      150,
      140,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick21.label = "brick21";
    let brick22 = Matter.Bodies.rectangle(
      200,
      140,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick22.label = "brick22";
    let brick23 = Matter.Bodies.rectangle(
      250,
      140,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick23.label = "brick23";
    let brick24 = Matter.Bodies.rectangle(
      300,
      140,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick24.label = "brick24";
    let brick25 = Matter.Bodies.rectangle(
      50,
      160,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick25.label = "brick25";
    let brick26 = Matter.Bodies.rectangle(
      100,
      160,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick26.label = "brick26";
    let brick27 = Matter.Bodies.rectangle(
      150,
      160,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick27.label = "brick27";
    let brick28 = Matter.Bodies.rectangle(
      200,
      160,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick28.label = "brick28";
    let brick29 = Matter.Bodies.rectangle(
      250,
      160,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick29.label = "brick29";
    let brick30 = Matter.Bodies.rectangle(
      300,
      160,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick30.label = "brick30";
    let brick31 = Matter.Bodies.rectangle(
      50,
      180,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick31.label = "brick31";
    let brick32 = Matter.Bodies.rectangle(
      100,
      180,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick32.label = "brick32";
    let brick33 = Matter.Bodies.rectangle(
      150,
      180,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick33.label = "brick33";
    let brick34 = Matter.Bodies.rectangle(
      200,
      180,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick34.label = "brick34";
    let brick35 = Matter.Bodies.rectangle(
      250,
      180,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick35.label = "brick35";
    let brick36 = Matter.Bodies.rectangle(
      300,
      180,
      Constants.BRICK_WIDTH,
      Constants.BRICK_HEIGHT,
      { isStatic: true }
    );
    brick36.label = "brick36";

    let ball = Matter.Bodies.circle(
      Constants.RACKET_START_X_POSITION,
      Constants.RACKET_Y_POSITION - 20,
      6,
      {
        isStatic: false,
        restitution: 1,
        inertia: Infinity,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        collisionFilter: { group: -1 },
      }
    );
    ball.label = "ball";
    let ballX = ball.position.x;
    let ballY = ball.position.y;

    let wallLeft = Matter.Bodies.rectangle(
      Constants.WALL_WIDTH / 2,
      Constants.WALL_HEIGHT / 2,
      Constants.WALL_WIDTH,
      Constants.WALL_HEIGHT,
      {
        isStatic: true,
      }
    );

    let wallRight = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH - Constants.WALL_WIDTH / 2,
      Constants.MAX_HEIGHT - Constants.WALL_HEIGHT / 2,
      Constants.WALL_WIDTH,
      Constants.WALL_HEIGHT,
      {
        isStatic: true,
      }
    );

    let ceiling = Matter.Bodies.rectangle(
      Constants.RACKET_START_X_POSITION,
      Constants.WALL_WIDTH / 2,
      Constants.WALL_HEIGHT,
      Constants.WALL_WIDTH,
      {
        isStatic: true,
      }
    );

    let floor = Matter.Bodies.rectangle(
      Constants.RACKET_START_X_POSITION,
      Constants.MAX_HEIGHT,
      Constants.WALL_HEIGHT,
      Constants.WALL_WIDTH,
      {
        isStatic: true,
      }
    );
    floor.label = "floor";
    useEffect(() => {
      Matter.World.add(world, [
        racket,
        ball,
        wallLeft,
        wallRight,
        ceiling,
        floor,
        brick1,
        brick2,
        brick3,
        brick4,
        brick5,
        brick6,
        brick7,
        brick8,
        brick9,
        brick10,
        brick11,
        brick12,
        brick13,
        brick14,
        brick15,
        brick16,
        brick17,
        brick18,
        brick19,
        brick20,
        brick21,
        brick22,
        brick23,
        brick24,
        brick25,
        brick26,
        brick27,
        brick28,
        brick29,
        brick30,
        brick31,
        brick32,
        brick33,
        brick34,
        brick35,
        brick36,
      ]);
    }, []);

    Matter.Events.on(engine, "collisionStart", (event) => {
      var pairs = event.pairs;

      let labels = [pairs[0].bodyA.label, pairs[0].bodyB.label];
      if (labels.indexOf("ball") >= 0 && labels.indexOf("floor") >= 0) {
        if (lives > 1) {
          gameEngineRef.current.dispatch({ type: "ball-lost" });
        } else {
          gameEngineRef.current.dispatch({ type: "game-over" });
        }
      }
    });

    // Add your brick setup code here
    useEffect(() => {
      Matter.Events.on(engine, "collisionStart", (event) => {
        var pairs = event.pairs;
        let labels = [pairs[0].bodyA.label, pairs[0].bodyB.label];
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick1") >= 0) {
          Matter.World.remove(world, [brick1], true);
          gameEngineRef.current.dispatch({ type: "collided1" });
          console.log("brick1");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick2") >= 0) {
          Matter.World.remove(world, [brick2], true);
          gameEngineRef.current.dispatch({ type: "collided2" });
          console.log("brick2");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick3") >= 0) {
          Matter.World.remove(world, [brick3], true);
          gameEngineRef.current.dispatch({ type: "collided3" });
          console.log("brick3");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick4") >= 0) {
          Matter.World.remove(world, [brick4], true);
          gameEngineRef.current.dispatch({ type: "collided4" });
          console.log("brick4");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick5") >= 0) {
          Matter.World.remove(world, [brick5], true);
          gameEngineRef.current.dispatch({ type: "collided5" });
          console.log("brick5");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick6") >= 0) {
          Matter.World.remove(world, [brick6], true);
          gameEngineRef.current.dispatch({ type: "collided6" });
          console.log("brick6");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick7") >= 0) {
          Matter.World.remove(world, [brick7], true);
          gameEngineRef.current.dispatch({ type: "collided7" });
          console.log("brick7");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick8") >= 0) {
          Matter.World.remove(world, [brick8], true);
          gameEngineRef.current.dispatch({ type: "collided8" });
          console.log("brick8");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick9") >= 0) {
          Matter.World.remove(world, [brick9], true);
          gameEngineRef.current.dispatch({ type: "collided9" });
          console.log("brick9");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick10") >= 0) {
          Matter.World.remove(world, [brick10], true);
          gameEngineRef.current.dispatch({ type: "collided10" });
          console.log("brick10");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick11") >= 0) {
          Matter.World.remove(world, [brick11], true);
          gameEngineRef.current.dispatch({ type: "collided11" });
          console.log("brick11");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick12") >= 0) {
          Matter.World.remove(world, [brick12], true);
          gameEngineRef.current.dispatch({ type: "collided12" });
          console.log("brick12");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick13") >= 0) {
          Matter.World.remove(world, [brick13], true);
          gameEngineRef.current.dispatch({ type: "collided13" });
          console.log("brick13");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick14") >= 0) {
          Matter.World.remove(world, [brick14], true);
          gameEngineRef.current.dispatch({ type: "collided14" });
          console.log("brick14");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick15") >= 0) {
          Matter.World.remove(world, [brick15], true);
          gameEngineRef.current.dispatch({ type: "collided15" });
          console.log("brick15");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick16") >= 0) {
          Matter.World.remove(world, [brick16], true);
          gameEngineRef.current.dispatch({ type: "collided16" });
          console.log("brick16");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick17") >= 0) {
          Matter.World.remove(world, [brick17], true);
          gameEngineRef.current.dispatch({ type: "collided17" });
          console.log("brick17");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick18") >= 0) {
          Matter.World.remove(world, [brick18], true);
          gameEngineRef.current.dispatch({ type: "collided18" });
          console.log("brick18");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick19") >= 0) {
          Matter.World.remove(world, [brick19], true);
          gameEngineRef.current.dispatch({ type: "collided19" });
          console.log("brick19");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick20") >= 0) {
          Matter.World.remove(world, [brick20], true);
          gameEngineRef.current.dispatch({ type: "collided20" });
          console.log("brick20");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick21") >= 0) {
          Matter.World.remove(world, [brick21], true);
          gameEngineRef.current.dispatch({ type: "collided21" });
          console.log("brick21");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick22") >= 0) {
          Matter.World.remove(world, [brick22], true);
          gameEngineRef.current.dispatch({ type: "collided22" });
          console.log("brick22");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick23") >= 0) {
          Matter.World.remove(world, [brick23], true);
          gameEngineRef.current.dispatch({ type: "collided23" });
          console.log("brick23");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick24") >= 0) {
          Matter.World.remove(world, [brick24], true);
          gameEngineRef.current.dispatch({ type: "collided24" });
          console.log("brick24");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick25") >= 0) {
          Matter.World.remove(world, [brick25], true);
          gameEngineRef.current.dispatch({ type: "collided25" });
          console.log("brick25");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick26") >= 0) {
          Matter.World.remove(world, [brick26], true);
          gameEngineRef.current.dispatch({ type: "collided26" });
          console.log("brick26");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick27") >= 0) {
          Matter.World.remove(world, [brick27], true);
          gameEngineRef.current.dispatch({ type: "collided27" });
          console.log("brick27");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick28") >= 0) {
          Matter.World.remove(world, [brick28], true);
          gameEngineRef.current.dispatch({ type: "collided28" });
          console.log("brick28");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick29") >= 0) {
          Matter.World.remove(world, [brick29], true);
          gameEngineRef.current.dispatch({ type: "collided29" });
          console.log("brick29");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick30") >= 0) {
          Matter.World.remove(world, [brick30], true);
          gameEngineRef.current.dispatch({ type: "collided30" });
          console.log("brick30");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick31") >= 0) {
          Matter.World.remove(world, [brick31], true);
          gameEngineRef.current.dispatch({ type: "collided31" });
          console.log("brick31");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick32") >= 0) {
          Matter.World.remove(world, [brick32], true);
          gameEngineRef.current.dispatch({ type: "collided32" });
          console.log("brick32");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick33") >= 0) {
          Matter.World.remove(world, [brick33], true);
          gameEngineRef.current.dispatch({ type: "collided33" });
          console.log("brick33");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick34") >= 0) {
          Matter.World.remove(world, [brick34], true);
          gameEngineRef.current.dispatch({ type: "collided34" });
          console.log("brick34");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick35") >= 0) {
          Matter.World.remove(world, [brick35], true);
          gameEngineRef.current.dispatch({ type: "collided35" });
          console.log("brick35");
        }
        if (labels.indexOf("ball") >= 0 && labels.indexOf("brick36") >= 0) {
          Matter.World.remove(world, [brick36], true);
          gameEngineRef.current.dispatch({ type: "collided36" });
          console.log("brick36");
        }
      });
    }, [score]);

    return {
      physics: { engine, world },
      racket: {
        body: racket,
        size: [Constants.RACKET_WIDTH, Constants.RACKET_HEIGHT],
        color: "blue",
        renderer: Racket,
      },
      ball: {
        body: ball,
        size: [10, 10],
        color: "red",
        renderer: Ball,
      },
      wallLeft: {
        body: wallLeft,
        size: [Constants.WALL_WIDTH, Constants.WALL_HEIGHT],
        color: colors.secondarydark,
        renderer: Wall,
      },
      wallRight: {
        body: wallRight,
        size: [Constants.WALL_WIDTH, Constants.WALL_HEIGHT],
        color: colors.secondarydark,
        renderer: Wall,
      },
      ceiling: {
        body: ceiling,
        size: [Constants.WALL_HEIGHT, Constants.WALL_WIDTH],
        color: colors.secondarydark,
        renderer: Wall,
      },
      floor: {
        body: floor,
        size: [Constants.WALL_HEIGHT, Constants.WALL_WIDTH],
        color: colors.red,
        renderer: Wall,
      },
      // Add your bricks entities here
      brick1: {
        body: brick1,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: colors.primarydark,
        renderer: BrickRenderer,
      },
      brick2: {
        body: brick2,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "blue",
        renderer: BrickRenderer,
      },
      brick3: {
        body: brick3,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "orange",
        renderer: BrickRenderer,
      },
      brick4: {
        body: brick4,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "brown",
        renderer: BrickRenderer,
      },
      brick5: {
        body: brick5,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "purple",
        renderer: BrickRenderer,
      },
      brick6: {
        body: brick6,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "green",
        renderer: BrickRenderer,
      },
      brick7: {
        body: brick7,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "black",
        renderer: BrickRenderer,
      },
      brick8: {
        body: brick8,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "grey",
        renderer: BrickRenderer,
      },
      brick9: {
        body: brick9,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "magenta",
        renderer: BrickRenderer,
      },
      brick10: {
        body: brick10,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "gold",
        renderer: BrickRenderer,
      },
      brick11: {
        body: brick11,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "indigo",
        renderer: BrickRenderer,
      },
      brick12: {
        body: brick12,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "sienna",
        renderer: BrickRenderer,
      },
      brick13: {
        body: brick13,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "teal",
        renderer: BrickRenderer,
      },
      brick14: {
        body: brick14,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "purple",
        renderer: BrickRenderer,
      },
      brick15: {
        body: brick15,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: colors.primarydark,
        renderer: BrickRenderer,
      },
      brick16: {
        body: brick16,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "salmon",
        renderer: BrickRenderer,
      },
      brick17: {
        body: brick17,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "orchid",
        renderer: BrickRenderer,
      },
      brick18: {
        body: brick18,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "tan",
        renderer: BrickRenderer,
      },
      brick19: {
        body: brick19,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "tomato",
        renderer: BrickRenderer,
      },
      brick20: {
        body: brick20,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "plum",
        renderer: BrickRenderer,
      },
      brick21: {
        body: brick21,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "green",
        renderer: BrickRenderer,
      },
      brick22: {
        body: brick22,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "gold",
        renderer: BrickRenderer,
      },
      brick23: {
        body: brick23,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "violet",
        renderer: BrickRenderer,
      },
      brick24: {
        body: brick24,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "indigo",
        renderer: BrickRenderer,
      },
      brick25: {
        body: brick25,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "black",
        renderer: BrickRenderer,
      },
      brick26: {
        body: brick26,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "pink",
        renderer: BrickRenderer,
      },
      brick27: {
        body: brick27,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "brown",
        renderer: BrickRenderer,
      },
      brick28: {
        body: brick28,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "salmon",
        renderer: BrickRenderer,
      },
      brick29: {
        body: brick29,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "slategray",
        renderer: BrickRenderer,
      },
      brick30: {
        body: brick30,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "magenta",
        renderer: BrickRenderer,
      },
      brick31: {
        body: brick31,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "navy",
        renderer: BrickRenderer,
      },
      brick32: {
        body: brick32,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "olive",
        renderer: BrickRenderer,
      },
      brick33: {
        body: brick33,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "black",
        renderer: BrickRenderer,
      },
      brick34: {
        body: brick34,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: colors.primarylight,
        renderer: BrickRenderer,
      },
      brick35: {
        body: brick35,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "gray",
        renderer: BrickRenderer,
      },
      brick36: {
        body: brick36,
        size: { width: Constants.BRICK_WIDTH, height: Constants.BRICK_HEIGHT },
        color: "red",
        renderer: BrickRenderer,
      },
    };
  }

  const onEvent = (e) => {
    if (e.type === "game-over") {
      resetBall();
      resetRacket();
      setRunning(false);
      setLives(0);
      setScore(0);
      AddLeader;
    } else if (e.type === "collided1") {
      moveBrick1();
    } else if (e.type === "collided2") {
      moveBrick2();
    } else if (e.type === "collided3") {
      moveBrick3();
    } else if (e.type === "collided4") {
      moveBrick4();
    } else if (e.type === "collided5") {
      moveBrick5();
    } else if (e.type === "collided6") {
      moveBrick6();
    } else if (e.type === "collided7") {
      moveBrick7();
    } else if (e.type === "collided8") {
      moveBrick8();
    } else if (e.type === "collided9") {
      moveBrick9();
    } else if (e.type === "collided10") {
      moveBrick10();
    } else if (e.type === "collided11") {
      moveBrick11();
    } else if (e.type === "collided12") {
      moveBrick12();
    } else if (e.type === "collided13") {
      moveBrick13();
    } else if (e.type === "collided14") {
      moveBrick14();
    } else if (e.type === "collided15") {
      moveBrick15();
    } else if (e.type === "collided16") {
      moveBrick16();
    } else if (e.type === "collided17") {
      moveBrick17();
    } else if (e.type === "collided18") {
      moveBrick18();
    } else if (e.type === "collided19") {
      moveBrick19();
    } else if (e.type === "collided20") {
      moveBrick20();
    } else if (e.type === "collided21") {
      moveBrick21();
    } else if (e.type === "collided22") {
      moveBrick22();
    } else if (e.type === "collided23") {
      moveBrick23();
    } else if (e.type === "collided24") {
      moveBrick24();
    } else if (e.type === "collided25") {
      moveBrick25();
    } else if (e.type === "collided26") {
      moveBrick26();
    } else if (e.type === "collided27") {
      moveBrick27();
    } else if (e.type === "collided28") {
      moveBrick28();
    } else if (e.type === "collided29") {
      moveBrick29();
    } else if (e.type === "collided30") {
      moveBrick30();
    } else if (e.type === "collided31") {
      moveBrick31();
    } else if (e.type === "collided32") {
      moveBrick32();
    } else if (e.type === "collided33") {
      moveBrick33();
    } else if (e.type === "collided34") {
      moveBrick34();
    } else if (e.type === "collided35") {
      moveBrick35();
    } else if (e.type === "collided36") {
      moveBrick36();
    } else if (e.type === "levelup") {
      resetBall();
      resetRacket();
    } else if (e.type === "ball-lost") {
      let newLives = lives - 1;
      resetBall();
      resetRacket();
      setStartGame(false);
      setLives(newLives);
      if (newLives === 0) {
        // All lives are lost, end the game
        gameEngineRef.current.dispatch({ type: "game-over" });
      }
    }
  };

  useEffect(() => {
    if (score == 36) {
      setLevel(level + 1);
      resetBall();
      resetRacket();
    }
  }, [score]);

  const resetBall = () => {
    Matter.Body.setVelocity(entities.current.ball.body, { x: 0, y: 0 });

    Matter.Body.setPosition(entities.current.ball.body, {
      x: Constants.RACKET_START_X_POSITION,
      y: Constants.RACKET_Y_POSITION - 20,
    });
  };

  const resetRacket = () => {
    Matter.Body.setPosition(entities.current.racket.body, {
      x: Constants.RACKET_START_X_POSITION,
      y: Constants.RACKET_Y_POSITION,
    });
  };

  const start = (e) => {
    setStartGame(true);

    let force = 7;

    let angle = Matter.Vector.angle(entities.current.ball.body.position, {
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY,
    });

    Matter.Body.setVelocity(entities.current.ball.body, {
      x: force * Math.cos(angle),
      y: force * Math.sin(angle),
    });
  };

  const reset = () => {
    // Reset the game
    // This function should reset the game state.
    // You can call it to restart the game.
    navigation.replace("Home");
    resetBall();
    resetRacket();
    setRunning(true);
    setStartGame(false);
    setLives(3);
    setScore(0);
  };

  const [visible1, setVisible1] = useState(false);

  const togglePause = () => {
    if (paused) {
      // If paused, resume the game // Unfreeze the ball
      Matter.Body.setStatic(entities.current.ball.body, true);
      Matter.Body.setPosition(entities.current.ball.body, {
        x: Constants.RACKET_START_X_POSITION,
        y: Constants.RACKET_Y_POSITION - 20,
      });
      Matter.Body.setPosition(entities.current.racket.body, {
        x: Constants.RACKET_START_X_POSITION,
        y: Constants.RACKET_Y_POSITION,
      });
      setVisible1(!visible1);
    } else {
      // If not paused, pause the game
      Matter.Body.setStatic(entities.current.ball.body, false);
      Matter.Body.setVelocity(entities.current.ball.body, {
        x: Math.floor(Math.random() * 17) - 7,
        y: -7,
      }); // Freeze the ball
      console.log(Math.floor(Math.random() * 20) - 10);
      console.log(Math.round(Math.random() * 40) - 20);
    }
    setPaused(!paused); // Toggle the pause state
    console.log(paused);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/home.png")} // Set the path to your image
        style={styles.imageBackground}
      >
        <GameEngine
          ref={gameEngineRef}
          style={styles.gameContainer}
          systems={[Physics]}
          running={running}
          onEvent={onEvent}
          entities={entities.current}
        >
          <StatusBar hidden={true} />

          <Button
            title="Go Back"
            textstyle={{ fontSize: 20, fontFamily: fonts.extraBold }}
            style={{
              width: "30%",
              height: 30,
              top: 0,
              padding: 0,
              alignSelf: "flex-start",
              marginTop: 40,
              marginStart: 20,
              position: "absolute",
              zIndex: 999999,
            }}
            onPress={() => navigation.goBack()}
          />
        </GameEngine>

        {running && !startGame && (
          <TouchableOpacity style={styles.fullScreenButton} onPress={start}>
            <View style={styles.startFullScreen}>
              <Text style={styles.startText}>
                Click anywhere on the screen to shoot the ball in that direction
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Left Button */}
        <TouchableOpacity style={styles.leftButton} onPress={moveRacketLeft}>
          <Ionicons name="ios-arrow-back" size={40} color="black" />
        </TouchableOpacity>

        {/* Center Button for Pause/Play */}
        <TouchableOpacity style={styles.centerButton} onPress={togglePause}>
          {paused ? (
            <Ionicons name="ios-pause" size={40} color="black" />
          ) : (
            <Ionicons name="ios-play" size={40} color="black" />
          )}
        </TouchableOpacity>

        {/* Right Button */}
        <TouchableOpacity style={styles.rightButton} onPress={moveRacketRight}>
          <Ionicons name="ios-arrow-forward" size={40} color="black" />
        </TouchableOpacity>

        <Image source={heart} style={styles.heart} />
        <Text style={{ ...styles.livesText, top: 20 }}>{lives}</Text>
        <Text style={{ ...styles.livesText, top: 20, left: 300, fontSize: 15 }}>
          Score: {score}
        </Text>
        <Text
          style={{ ...styles.livesText, bottom: 57, left: 245, fontSize: 15 }}
        >
          Level:{" "}
        </Text>
        <Text
          style={{ ...styles.livesText, bottom: 25, left: 255, fontSize: 40 }}
        >
          {level}
        </Text>

        {/* The Pause Alert */}
        <Modal
        visible={ visible1 }
        handleCloseModal={() => setVisible1(false)}
      >
        <View style={styles.modalContainer}>
        <Text style={{ fontWeight: '700', padding: 3, }}>Game Paused!</Text>
           
        <View 
          onPress={() => setVisible1(false)} >
                      <Text>Click on the play button to continue your game</Text>  
        </View> 
        </View>
      </Modal>

        {!running && (
          <TouchableOpacity style={styles.fullScreenButton} onPress={reset}>
            <View style={styles.gameOverFull}>
              <Text style={styles.gameOverText}>Game Over</Text>
            </View>
          </TouchableOpacity>
        )}

        {score === 36 && (
          <TouchableOpacity style={styles.fullScreenButton} onPress={reset}>
            <View style={styles.gameOverFullScreen}>
              <Text style={styles.gameOver}>Level Up!</Text>
              <View style={styles.levelup}>
                <AntDesign name="caretup" style={styles.levelup} />
                <AntDesign name="caretup" style={styles.levelup} />
                <AntDesign name="caretup" style={styles.levelup} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackground: {
    flex: 1,
    position: "relative",
    resizeMode: "cover", // You can adjust the resizeMode as needed
    justifyContent: "center", // Adjust as needed
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    color: "red",
    fontSize: 48,
    fontFamily: fonts.extraBold,
  },
  gameOver: {
    color: "white",
    fontSize: 48,
    fontFamily: fonts.extraBold,
  },
  startText: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    fontFamily: fonts.extraBold,
  },
  startFullScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenButton: {
    position: "absolute",
    marginTop: 90,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  heart: {
    position: "absolute",
    top: 20,
    left: 25,
    flex: 1,
    width: 20,
    height: 20,
  },
  livesText: {
    position: "absolute",
    left: 45,
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
  },
  leftButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "lightgray",
    borderRadius: 50,
    padding: 10,
  },
  rightButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "lightgray",
    borderRadius: 50,
    padding: 10,
  },
  centerButton: {
    position: "absolute",
    bottom: 20,
    left: Constants.MAX_WIDTH / 2 - 20, // Adjust the position based on your layout
    backgroundColor: "lightgray",
    borderRadius: 50,
    padding: 10,
  },
  gameOverFull: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverFullScreen: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primarydark,
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  levelup: {
    color: "white",
    fontSize: 48,
    fontFamily: fonts.extraBold,
  },
  modalContainer: {
    width: "70%",
    backgroundColor: 'beige',
    padding: 20,
    gap: 20,
    borderRadius: 20,
  },
  modalItem: { 
    marginHorizontal: -10, 
    borderRadius: 8, 
    backgroundColor: 'white', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 8, 
  },
});




export default App;