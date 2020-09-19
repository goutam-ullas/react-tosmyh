import React, { useRef, useEffect, useState } from "react";
import {
  SliderInput,
  SliderTrack,
  SliderTrackHighlight,
  SliderHandle,
  SliderMarker
} from "@reach/slider";
import "@reach/slider/styles.css";
import ReactPlayer from "react-player";
import smoothscroll from "smoothscroll-polyfill";
import Typekit from "react-typekit";
//import { Document, Page } from "react-pdf";
import { Document } from "react-pdf/dist/esm/entry.parcel";
import "./style.css";
import mapboxgl from "mapbox-gl";
//import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibm5pa2l0YSIsImEiOiJjazdtYzV2MDYwMzliM2dubnVubnJuMTRrIn0.6KqRhtWgMc_nGwMPAqmstQ";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapHeight: window.innerHeight,
      mapWidth: window.innerWidth,
      lng: 78.4735,
      lat: 17.3755,
      value: 50,
      index: true,
      squareState: true,
      circleState: 1,
      aboutState: true,
      aboutWidth: 0,
      researchState: true,
      researchWidth: 0,
      researchBorder: 0,
      legendState: true,
      legendHeight: 0,
      squareText: "",
      circleText: "",
      maxThemes: 2,
      themeLeft: 50,
      themeStart: 1.25 * window.innerHeight,
      themeGap: window.innerHeight,
      videoDimX1: 1,
      videoDimX2: 1,
      videoDimX3: 1,
      videoZindex1: 1,
      videoZindex2: 1,
      videoZindex3: 1,
      videoHeight: 360,
      videoWidth: 640,
      imageDimX1: 0,
      imageZindex1: 1,
      popUp: false,
      popUpX: 0,
      popUpY: 0,
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    };
    this.circleFunction = this.circleFunction.bind(this);
    this.squareFunction = this.squareFunction.bind(this);
    this.aboutFunction = this.aboutFunction.bind(this);
    this.legendFunction = this.legendFunction.bind(this);
    this.researchFunction = this.researchFunction.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.aboutText =
      "This thesis looks at an urban market, Begum Bazar situated in the old city of Hyderabad and its relation to gender. The work, initially set out to explore kitchen objects and their place in shaping one’s life, eventually becomes an exploration into how, space and gender narratives co-exist and help sustain each other. By using the example of this market situated in a major metropolitan Indian city, and through interviews of people occupying and visiting the space, the work speculates on how social hierarchies and practices gain ground. This work is an inquiry, which is both personal and not, and in doing so, also wrestles on this interplay between the public and the private, in gender and in research. Through this, the thesis ultimately hopes to express how the organization of space is linked to how power organizes itself. This discussion is told through questions as they came to be felt. This thesis looks at an urban market, Begum Bazar situated in the old city of Hyderabad and its relation to gender. The work, initially set out to explore kitchen objects and their place in shaping one’s life, eventually becomes an exploration into how, space and gender narratives co-exist and help sustain each other. By using the example of this market situated in a major metropolitan Indian city, and through interviews of people occupying and visiting the space, the work speculates on how social hierarchies and practices gain ground. This work is an inquiry, which is both personal and not, and in doing so, also wrestles on this interplay between the public and the private, in gender and in research. Through this, the thesis ultimately hopes to express how the organization of space is linked to how power organizes itself. This discussion is told through questions as they came to be felt.";
    this.theme1Title = "This is Theme 1";
    this.theme1Desc =
      "This thesis looks at an urban market, Begum Bazar situated in the old city of Hyderabad and its relation to gender. The work, initially set out to explore kitchen objects and their place in shaping one’s life, eventually becomes an exploration into how, space and gender narratives co-exist and help sustain each other. By using the example of this market situated in a major metropolitan Indian city, and through interviews of people occupying and visiting the space, the work speculates on how social hierarchies and practices gain ground.";
    this.theme2Title = "This is Theme 2";
    this.theme2Desc =
      "This thesis looks at an urban market, Begum Bazar situated in the old city of Hyderabad and its relation to gender. The work, initially set out to explore kitchen objects and their place in shaping one’s life, eventually becomes an exploration into how, space and gender narratives co-exist and help sustain each other. By using the example of this market situated in a major metropolitan Indian city, and through interviews of people occupying and visiting the space, the work speculates on how social hierarchies and practices gain ground.";
    this.theme3Title = "This is Theme 3";
    this.theme3Desc =
      "This thesis looks at an urban market, Begum Bazar situated in the old city of Hyderabad and its relation to gender. The work, initially set out to explore kitchen objects and their place in shaping one’s life, eventually becomes an exploration into how, space and gender narratives co-exist and help sustain each other. By using the example of this market situated in a major metropolitan Indian city, and through interviews of people occupying and visiting the space, the work speculates on how social hierarchies and practices gain ground.";
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/nnikita/ckd7n4m5b04e31ip8ai5a1xfj",
      center: [this.state.lng, this.state.lat],
      zoom: 19,
      pitch: 60,
      attributionControl: false,
      interactive: false
    });

    this.map.scrollZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.dragPan.enable();
    smoothscroll.polyfill();
    document.addEventListener("mousedown", this.handleClickOutside);
    var deltaDistance = 100;
    var deltaDegrees = 10;

    function easing(t) {
      return t * (2 - t);
    }

    this.map.on("load", () => {
      this.map.getCanvas().focus();

      window.addEventListener(
        "keydown",
        e => {
          e.preventDefault();
          if (e.which === 38) {
            // up
            this.map.panBy([0, -deltaDistance], {
              easing: easing
            });
          } else if (e.which === 40) {
            // down
            this.map.panBy([0, deltaDistance], {
              easing: easing
            });
          } else if (e.which === 37) {
            // left
            this.map.easeTo({
              bearing: this.map.getBearing() - deltaDegrees,
              easing: easing
            });
          } else if (e.which === 39) {
            // right
            this.map.easeTo({
              bearing: this.map.getBearing() + deltaDegrees,
              easing: easing
            });
          }
        },
        true
      );
    });

    this.map.on("click", e => {
      var pageX = window.event.pageX;
      var pageY = window.event.pageY;
      var features = this.map.queryRenderedFeatures(e.point, {
        layers: ["gods"]
      });
      if (features.length) {
        this.setState({
          pointName: features[0].properties.Name,
          layerName: "Place of Worship",
          popUpX: pageX,
          popUpY: pageY,
          popUpH: 500,
          popUpW: 500,
          popUpPad: 3
        });
      } else {
        features = this.map.queryRenderedFeatures(e.point, {
          layers: ["gods-stores"]
        });
        if (features.length) {
          this.setState({
            pointName: features[0].properties.Name,
            layerName: "Religious Store",
            popUpX: pageX,
            popUpY: pageY,
            popUpH: 500,
            popUpW: 500,
            popUpPad: 3
          });
        } else {
          features = this.map.queryRenderedFeatures(e.point, {
            layers: ["restaurant"]
          });
          if (features.length) {
            this.setState({
              pointName: features[0].properties.Name,
              layerName: "Restaurant",
              popUpX: pageX,
              popUpY: pageY,
              popUpH: 500,
              popUpW: 500,
              popUpPad: 3
            });
          } else {
            features = this.map.queryRenderedFeatures(e.point, {
              layers: ["beauty-and-wedding"]
            });
            if (features.length) {
              this.setState({
                pointName: features[0].properties.Name,
                layerName: "Beauty and Wedding Store",
                popUpX: pageX,
                popUpY: pageY,
                popUpH: 500,
                popUpW: 500,
                popUpPad: 3
              });
            } else {
              features = this.map.queryRenderedFeatures(e.point, {
                layers: ["kitchen-utensils"]
              });
              if (features.length) {
                this.setState({
                  pointName: features[0].properties.Name,
                  layerName: "Kitchen Utensils Store",
                  popUpX: pageX,
                  popUpY: pageY,
                  popUpH: 500,
                  popUpW: 500,
                  popUpPad: 3
                });
              } else {
                features = this.map.queryRenderedFeatures(e.point, {
                  layers: ["kitchen-utensils"]
                });
                if (features.length) {
                  this.setState({
                    pointName: features[0].properties.Name,
                    layerName: "Kitchen Utensils Store",
                    popUpX: pageX,
                    popUpY: pageY,
                    popUpH: 500,
                    popUpW: 500,
                    popUpPad: 3
                  });
                } else {
                  features = this.map.queryRenderedFeatures(e.point, {
                    layers: ["grocery-stores"]
                  });
                  if (features.length) {
                    this.setState({
                      pointName: features[0].properties.Name,
                      layerName: "Grocery Store",
                      popUpX: pageX,
                      popUpY: pageY,
                      popUpH: 500,
                      popUpW: 500,
                      popUpPad: 3
                    });
                  } else {
                    features = this.map.queryRenderedFeatures(e.point, {
                      layers: ["toys-stores"]
                    });
                    if (features.length) {
                      this.setState({
                        pointName: features[0].properties.Name,
                        layerName: "Toys Store",
                        popUpX: pageX,
                        popUpY: pageY,
                        popUpH: 500,
                        popUpW: 500,
                        popUpPad: 3
                      });
                    } else {
                      features = this.map.queryRenderedFeatures(e.point, {
                        layers: ["plastic-goods-stores"]
                      });
                      if (features.length) {
                        this.setState({
                          pointName: features[0].properties.Name,
                          layerName: "Plastic Goods Store",
                          popUpX: pageX,
                          popUpY: pageY,
                          popUpH: 500,
                          popUpW: 500,
                          popUpPad: 3
                        });
                      } else {
                        features = this.map.queryRenderedFeatures(e.point, {
                          layers: ["bars-and-liquor"]
                        });
                        if (features.length) {
                          this.setState({
                            pointName: features[0].properties.Name,
                            layerName: "Bar and Liquor Store",
                            popUpX: pageX,
                            popUpY: pageY,
                            popUpH: 500,
                            popUpW: 500,
                            popUpPad: 3
                          });
                        } else {
                          this.setState({
                            popUpH: 0,
                            popUpW: 0,
                            pointName: "",
                            layerName: "",
                            popUpPad: 0
                          });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    this.map.on("drag", () => {
      this.setState({
        popUpH: 0,
        popUpW: 0,
        pointName: "",
        layerName: "",
        popUpPad: 0
      });
    });

    this.map.on("move", () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2),
        popUpH: 0,
        popUpW: 0,
        pointName: "",
        layerName: "",
        popUpPad: 0
      });
    });
  }

  indexFunction() {
    console.log("index");
    window.location.reload(false);
    window.scrollTo(0, 0);
  }

  updateDimensions() {
    this.setState({
      mapHeight: window.innerHeight,
      mapWidth: window.innerWidth
    });
  }

  aboutFunction() {
    console.log("about");
    this.setState(prevState => ({
      aboutState: !prevState.aboutState
    }));
    this.setState({
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    if (this.state.researchState == false) {
      this.setState({ researchWidth: 0, researchState: true });
    }
    if (this.state.legendState == false) {
      this.setState({ legendHeight: 0, legendState: true });
    }
    if (this.state.aboutState == true) {
      this.setState({ aboutWidth: window.innerWidth / 2 });
    } else {
      this.setState({ aboutWidth: 0 });
    }
  }

  legendFunction() {
    console.log("legend");
    this.setState(prevState => ({
      legendState: !prevState.legendState
    }));
    this.setState({
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    if (this.state.aboutState == false) {
      this.setState({ aboutWidth: 0, aboutState: true });
    }
    if (this.state.researchState == false) {
      this.setState({ researchWidth: 0, researchState: true });
    }
    if (this.state.legendState == true) {
      this.setState({ legendHeight: window.innerHeight / 5 });
    } else {
      this.setState({ legendHeight: 0 });
    }
  }

  researchFunction() {
    console.log("research");
    this.setState(prevState => ({
      researchState: !prevState.researchState
    }));
    this.setState({
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    if (this.state.aboutState == false) {
      this.setState({ aboutWidth: 0, aboutState: true });
    }
    if (this.state.legendState == false) {
      this.setState({ legendHeight: 0, legendState: true });
    }
    if (this.state.researchState == true) {
      this.setState({
        researchWidth: window.innerWidth / 2,
        researchBorder: 50
      });
    } else {
      this.setState({ researchWidth: 0, researchBorder: 0 });
    }
  }

  circleFunction() {
    console.log("circle");
    this.setState({
      aboutWidth: 0,
      aboutState: true,
      legendWidth: 0,
      legendState: false,
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    if (this.state.circleState == this.state.maxThemes) {
      this.setState({ circleState: 0 });
    } else {
      this.setState(prevState => ({ circleState: prevState.circleState + 1 }));
    }
    console.log(this.state.circleState);
    var scrollTop = this.state.themeGap * this.state.circleState;
    if (scrollTop == 0) {
      window.scrollTo(0, scrollTop);
    } else {
      window.scroll({
        top: scrollTop,
        left: 0,
        behavior: "smooth"
      });
    }
  }

  squareFunction() {
    console.log("square");
    this.setState(prevState => ({
      squareState: !prevState.squareState
    }));
    this.setState({
      aboutWidth: 0,
      aboutState: true,
      legendWidth: 0,
      legendState: false,
      popUpH: 0,
      popUpW: 0,
      pointName: "",
      layerName: "",
      popUpPad: 0
    });
    if (this.state.squareState == true) {
      this.setState({ squareText: "Square" });
    } else {
      this.setState({ squareText: "" });
    }
  }

  sliderChange(v) {
    this.setState({ value: v });
    this.map.zoomTo((1 / 49.5) * (v - 1) + 18);
  }

  toggleImage1() {
    this.setState(prevState => ({
      imageDimX1: 1 - prevState.imageDimX1
    }));
    this.setState(prevState => ({
      imageZindex1: prevState.imageZindex1 == 1 ? 10 : 1
    }));
  }

  render() {
    return (
      <div>
        <div
          ref={el => (this.mapContainer = el)}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            height: this.state.mapHeight,
            width: this.state.mapWidth
          }}
        >
          <div ref={el => (this.popUpRef = el)} />
        </div>
        <div
          style={{
            fontSize: 24,
            position: "absolute",
            color: "black",
            left: this.state.themeLeft,
            top: this.state.themeStart,
            height: this.state.themeGap,
            pointerEvents: "none"
          }}
        >
          <p className="theme"> {this.theme1Title} </p>
          <p className="theme">{this.theme1Desc}</p>
          <ReactPlayer
            className="video"
            style={{
              position: "absolute",
              top: 50,
              right: 300,
              zIndex: this.state.videoZindex1
            }}
            height={this.state.videoDimX1 * this.state.videoHeight}
            width={this.state.videoDimX1 * this.state.videoWidth}
            url="https://vimeo.com/447916895/08bdea37d0"
            controls={true}
            onPlay={() => this.setState({ videoDimX1: 2, videoZindex1: 10 })}
            onPause={() => this.setState({ videoDimX1: 1, videoZindex1: 1 })}
          />
          <ReactPlayer
            className="video"
            style={{
              position: "absolute",
              bottom: 300,
              right: 100,
              zIndex: this.state.videoZindex2
            }}
            height={this.state.videoDimX2 * this.state.videoHeight}
            width={this.state.videoDimX2 * this.state.videoWidth}
            url="https://vimeo.com/447916895/08bdea37d0"
            controls={true}
            onPlay={() => this.setState({ videoDimX2: 2, videoZindex2: 10 })}
            onPause={() => this.setState({ videoDimX2: 1, videoZindex2: 1 })}
          />
        </div>
        <div
          style={{
            fontSize: 24,
            position: "absolute",
            color: "black",
            left: window.innerWidth / 6,
            top: this.state.themeStart + this.state.themeGap,
            height: this.state.themeGap,
            width: (2 * window.innerWidth) / 3,
            pointerEvents: "none"
          }}
        >
          <div style={{ padding: 20, zIndex: 10 }}>
            <text
              style={{
                backgroundColor: "black",
                color: "white",
                alignSelf: "flex-start",
                fontSize: 34,
                fontFamily: "Helvetica, Sans-Serif",
                fontStyle: "oblique"
              }}
            >
              {this.theme2Title}
            </text>
          </div>
          <div style={{ padding: 20, zIndex: 10 }}>
            <text
              style={{
                backgroundColor: "black",
                color: "white",
                alignSelf: "flex-start",
                fontFamily: "Helvetica, Sans-Serif",
                fontStyle: "oblique"
              }}
            >
              {this.theme2Desc}
            </text>
          </div>
          <ReactPlayer
            className="video"
            style={{
              position: "absolute",
              top: 50,
              right: 0,
              zIndex: this.state.videoZindex1
            }}
            height={this.state.videoDimX1 * this.state.videoHeight}
            width={this.state.videoDimX1 * this.state.videoWidth}
            url="https://vimeo.com/447916895/08bdea37d0"
            controls={true}
            onPlay={() => this.setState({ videoDimX1: 2, videoZindex1: 10 })}
            onPause={() => this.setState({ videoDimX1: 1, videoZindex1: 1 })}
          />
          <span role="button" aria-label="" onClick={() => this.toggleImage1()}>
            <img
              className="video"
              style={{
                position: "absolute",
                bottom: 300,
                right: 100,
                zIndex: this.state.imageZindex1
              }}
              src="https://i.imgur.com/xRTW0OR.jpg"
              alt="Logo"
              height={(this.state.imageDimX1 + 1) * this.state.videoHeight}
              width="auto"
            />
          </span>
        </div>
        <div className="titlebar" style={{ top: -10, zIndex: 10 }}>
          <Typekit kitId="bor7jxc" />
          <span
            role="button"
            aria-label=""
            onClick={this.indexFunction}
            style={{
              fontSize: 48,
              position: "relative",
              display: "inline",
              top: 5,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center"
            }}
          >
            &#9675;
          </span>
          <span
            role="button"
            aria-label=""
            onClick={this.aboutFunction}
            style={{
              fontFamily: "ballinger-mono",
              fontSize: 24,
              position: "relative",
              display: "inline",
              top: 0,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center"
            }}
          >
            About
          </span>
          <SliderInput
            min={0}
            max={100}
            step={0.1}
            value={this.state.value}
            style={{
              position: "relative",
              display: "inline-block",
              top: -2,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center",
              verticalAlign: "middle",
              width: 120
            }}
            onChange={value => this.sliderChange(value)}
          >
            <SliderTrack style={{ height: 1 }}>
              <SliderTrackHighlight />
              <SliderHandle />
            </SliderTrack>
          </SliderInput>
          <span
            role="button"
            aria-label="Next"
            data-balloon-pos="down-right"
            onClick={this.circleFunction}
            style={{
              fontSize: 32,
              position: "relative",
              display: "inline",
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center"
            }}
          >
            &#11027;
          </span>
          <span
            role="button"
            aria-label="Triangle Button"
            data-balloon-pos="down-right"
            onClick={this.triangleFunction}
            style={{
              fontSize: 30,
              position: "relative",
              display: "inline-block",
              top: 3,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center"
            }}
          >
            &#9653;
          </span>
          <span
            role="button"
            aria-label="Legend"
            data-balloon-pos="down-right"
            onClick={this.legendFunction}
            style={{
              fontSize: 32,
              position: "relative",
              display: "inline",
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center"
            }}
          >
            &#9677;
          </span>
          <span
            role="button"
            aria-label=""
            onClick={this.researchFunction}
            style={{
              fontFamily: "ballinger-mono",
              fontSize: 24,
              position: "relative",
              display: "inline",
              top: 0,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center"
            }}
          >
            Research
          </span>
        </div>
        <div
          className="about"
          style={{
            width: this.state.aboutWidth,
            height: window.innerHeight,
            fontSize: 28,
            zIndex: 100
          }}
        >
          <span
            role="button"
            aria-label=""
            onClick={this.aboutFunction}
            style={{
              fontSize: 22,
              position: "absolute",
              marginLeft: 10,
              marginTop: 10,
              color: "white",
              zIndex: 300
            }}
          >
            &#10005;
          </span>
          <p style={{ margin: 50, fontSize: 18 }}> {this.aboutText} </p>
        </div>
        <div
          className="legend"
          style={{
            width: window.innerWidth,
            height: this.state.legendHeight,
            fontSize: 28,
            zIndex: 100
          }}
        >
          <span
            role="button"
            aria-label=""
            onClick={this.legendFunction}
            style={{
              fontSize: 22,
              position: "absolute",
              marginLeft: 10,
              marginTop: 10,
              color: "white",
              zIndex: 300
            }}
          >
            &#10005;
          </span>
          <p style={{ margin: 50 }}> legend </p>
        </div>
        <div
          className="research"
          style={{
            width: this.state.researchWidth,
            leftBorder: this.state.researchBorder,
            height: window.innerHeight,
            fontSize: 28,
            zIndex: 100
          }}
        >
          <div
            style={{
              left: 0,
              width: 50,
              height: window.innerHeight,
              position: "absolute",
              backgroundColor: "black",
              zIndex: 101
            }}
          />
          <span
            role="button"
            aria-label=""
            onClick={this.researchFunction}
            style={{
              fontSize: 22,
              position: "fixed",
              marginTop: 10,
              marginLeft: 10,
              color: "white",
              zIndex: 300
            }}
          >
            &#10005;
          </span>
          <div
            className="research"
            style={{
              width: this.state.researchWidth,
              leftBorder: this.state.researchBorder,
              height: window.innerHeight,
              fontSize: 28,
              zIndex: 100
            }}
          >
            <img
              style={{ marginLeft: 50, marginTop: window.innerHeight / 10 }}
              src="https://i.imgur.com/oEgq3R8.jpg"
              height={(4 * window.innerHeight) / 5}
              width="auto"
            />
            <img
              style={{ marginLeft: 50, marginTop: window.innerHeight / 10 }}
              src="https://i.imgur.com/Fn7Komh.jpg"
              height={(4 * window.innerHeight) / 5}
              width="auto"
            />
          </div>
        </div>
        <div>
          <text
            style={{
              fontFamily: "ballinger-mono",
              fontSize:12,
              position: "fixed",
              left: this.state.popUpX,
              top: this.state.popUpY,
              textAlign: "center",
              color: "white",
              backgroundColor: "black",
              alignSelf: "flex-start",
              padding: this.state.popUpPad
            }}
          >
            {this.state.pointName} <br /> {this.state.layerName}
          </text>
        </div>
      </div>
    );
  }
}

export default Application;
