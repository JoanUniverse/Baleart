import { Carousel } from 'react-carousel-minimal';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class CarouselFotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotos: ["hola"],
      captionStyle: {
        fontSize: '2em',
        fontWeight: 'bold',
      },
      slideNumberStyle: {
        fontSize: '20px',
        fontWeight: 'bold',
      }
    }
  }

  componentDidMount() {
    const config = {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
      //headers: { Authorization: 'Bearer ' + "token"}
    };
    axios.get('http://baleart.projectebaleart.com/public/api/espais', config)
      .then(response => {
        console.log(response);
        let cont = 0;
        response.data.forEach(espai => {
          if(cont < 10){
            let nom = espai.nom_espai;
            let imatge = espai.imatge;
            let display = {
              image: imatge,
              caption: nom
            };
            this.setState({fotos: this.state.fotos.concat(display)});
          }
          cont++;
        });
        console.log("Imatge1 ->" + JSON.stringify(this.state.fotos));
      })
      .catch(function (error) {
        console.log("ERROR -> " + error.response.data.error);
        if (error.response.status == 401) {
          //window.location.assign("/login");
        }
      })
  }

  render() {
    return (
      <div className="App">
        <div style={{ textAlign: "center" }}>
          <h2>Espais destacats</h2>
          <div style={{
            padding: "0 10px"
          }}>
            <Carousel
              data={this.state.fotos}
              time={0}
              width="850px"
              height="500px"
              captionStyle={this.state.captionStyle}
              radius="10px"
              slideNumber={true}
              slideNumberStyle={this.state.slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={true}
              thumbnailWidth="100px"
              style={{
                textAlign: "center",
                maxWidth: "850px",
                maxHeight: "500px",
                margin: "40px auto",
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

// {
//   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
//   caption: "San Francisco"
// },
// {
//   image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
//   caption: "Scotland"
// },
// {
//   image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
//   caption: "Darjeeling"
// },
// {
//   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
//   caption: "San Francisco"
// },
// {
//   image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
//   caption: "Scotland"
// },
// {
//   image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
//   caption: "Darjeeling"
// },
// {
//   image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
//   caption: "San Francisco"
// },
// {
//   image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
//   caption: "Scotland"
// },
// {
//   image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
//   caption: "Darjeeling"
// }