import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';
const app = new Clarifai.App({
  apiKey: '26b6efab1aa0407aa885f013d24dfc52'
});

const particlesOptions = {
  particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftcol: clarifaiFace.left_col * width,
      toprow: clarifaiFace.top_row * height,
      rightcol: width - (clarifaiFace.right_col * width),
      bottomrow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignIn: false})
    } else if(route === 'home'){
      this.setState({isSignIn: true})
    }
    this.setState({route: route});
  }
  render (){
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' ? 
        <div>
        <Logo />
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />

        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div> : (
        this.state.route === 'signin' ? 
        <SignIn onRouteChange={this.onRouteChange}/> :
        <Register onRouteChange={this.onRouteChange}/>
      )}
      </div>
    );
  }
}

export default App;
