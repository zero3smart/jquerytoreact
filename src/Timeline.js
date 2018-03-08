import React, { Component } from 'react';
import './Timeline.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import windowSize from 'react-window-size';
import $ from 'jquery';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.listenScrollEventWindow = this.listenScrollEventWindow.bind(this);
    this.listenScrollEventFirst = this.listenScrollEventFirst.bind(this);
    this.listenScrollEventSecond = this.listenScrollEventSecond.bind(this);
    this.listenScrollEventThird = this.listenScrollEventThird.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEventWindow);
    this.first.addEventListener('scroll', this.listenScrollEventFirst);
    this.second.addEventListener('scroll', this.listenScrollEventSecond);
    this.third.addEventListener('scroll', this.listenScrollEventThird);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEventWindow);
    this.first.removeEventListener('scroll', this.listenScrollEventFirst);
    this.second.removeEventListener('scroll', this.listenScrollEventSecond);
    this.third.removeEventListener('scroll', this.listenScrollEventThird);
  }

  listenScrollEventFirst(e) {
    $('html, body').animate({
      scrollTop: $(this.header).offset().top
    }, 2000);
  }

  listenScrollEventSecond(e) {
    $('html, body').animate({
      scrollTop: $(this.content).offset().top
    }, 2000);
  }

  listenScrollEventThird(e) {
    $('html, body').animate({
      scrollTop: $(this.footer).offset().top
    }, 2000);
  }

  listenScrollEventWindow(e) {
    if ($(window).scrollTop() >= ($(this.header).height() + $(this.content).height() / 2)) {
      $(this.third).addClass('btn-primary');
      $(this.third).removeClass('btn-outline-primary');
      $(this.first).addClass('btn-primary btn-outline-primary');
      $(this.first).removeClass('btn-primary');
      $(this.second).removeClass('btn-primary');
      $(this.second).addClass('btn-outline-primary');
      $(this.firstTip).addClass('invisible');
      $(this.secondTip).addClass('invisible');
      $(this.thirdTip).removeClass('invisible');
      $(this.thirdTip).css({top: this.props.windowHeight / 2 + 50});
    } else if ($(window).scrollTop() > $(this.header).height() / 2) {
      $(this.second).addClass('btn-primary');
      $(this.second).removeClass('btn-outline-primary');
      $(this.first).addClass('btn-primary btn-outline-primary');
      $(this.first).removeClass('btn-primary');
      $(this.third).removeClass('btn-primary');
      $(this.third).addClass('btn-outline-primary');
      $(this.firstTip).addClass('invisible');
      $(this.secondTip).removeClass('invisible');
      $(this.thirdTip).addClass('invisible');
      $(this.secondTip).css({top: this.props.windowHeight / 2 - 15});
    } else {
      $(this.first).addClass('btn-primary');
      $(this.first).removeClass('btn-outline-primary');
      $(this.second).addClass('btn-primary btn-outline-primary');
      $(this.second).removeClass('btn-primary');
      $(this.third).removeClass('btn-primary');
      $(this.third).addClass('btn-outline-primary');
      $(this.firstTip).removeClass('invisible');
      $(this.secondTip).addClass('invisible');
      $(this.thirdTip).addClass('invisible');
      $(this.firstTip).css({top: this.props.windowHeight / 2 - 80});
      $(this.firstTip).fadeIn(3000);
    }
  }

  render() {
    const divStyle = {top: this.props.windowHeight / 2 - 80};
    const contentStyle = {top: this.props.windowHeight / 2 - 80, position: 'fixed', right: '100px'};

    return (
      <div className="timeline-container">
        <div style={contentStyle} ref={elm => this.firstTip = elm}>
          <h1>Earth Trailers</h1>
          <p>Release Date:3/18/19</p>
          <p>Lead Actor Dalton Keck</p>
          <p>Sub-Genre: Zombies</p>
          <p>Producer: Tim Cook</p>
        </div>
        <div className="invisible" style={contentStyle} ref={elm => this.secondTip = elm}>
          <h1>Magma Eaters</h1>
          <p>Release Date:3/18/18</p>
          <p>Lead Actor Dalton Keck</p>
          <p>Sub-Genre: Nature</p>
          <p>Producer: Burt Reynolds</p>
        </div>
        <div className="invisible" style={contentStyle} ref={elm => this.thirdTip = elm}>
          <h1>Fly Again. II.</h1>
          <p>Release Date:3/18/89</p>
          <p>Lead Actor Dalton Keck</p>
          <p>Sub-Genre: Insectoid</p>
          <p>Producer: Tim Cook</p>
        </div>
        <div ref={elm => this.total = elm}>
          <div ref={elm => this.header = elm} style={{width: '100%', height: '800px'}}>

          </div>
          <div ref={elm => this.content = elm} style={{width: '100%', height: '800px'}}>

          </div>
          <div ref={elm => this.footer = elm} style={{width: '100%', height: '800px'}}>

          </div>
        </div>
        <div className="scroll" style={divStyle}>
          <div>
            <span style={{display: 'none'}}>users</span>
            <button ref={elm => this.first = elm} type="button" className="btn img-circle btn-primary">
              <i className="fa fa-users" />
            </button>
          </div>
          <div style={{marginTop: '40px'}}>
            <button ref={elm => this.second = elm} type="button" className="btn img-circle btn-outline-primary">
              <i className="fa fa-fire" />
            </button>
          </div>
          <div style={{marginTop: '40px'}}>
            <button ref={elm => this.third = elm} type="button" className="btn img-circle btn-outline-primary">
              <i className="fa fa-users" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default windowSize(Timeline);
