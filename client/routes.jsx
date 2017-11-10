import React from 'react';
//requires dom as well
import { mount } from 'react-mounter';

import { MainLayout } from './layouts/MainLayout.jsx';
import NotesContainer from './Notes/NotesContainer.jsx';
import About from './About.jsx';
import MyVideos from './MyVideos.jsx';

let fireReload = false;

FlowRouter.route('/', {
  triggersEnter: [reloadCheck],
  action() {
    mount(MainLayout, {
      content: (<NotesContainer />)
    })
  },  
  triggersExit: [routeCleanup]
});

function reloadCheck(context, redirect, stop) {
  if (fireReload) {
    console.log('Reloading ...');
    FlowRouter.reload();
    stop();
  }
}

function routeCleanup() {
  fireReload = !fireReload;
}

FlowRouter.route('/single/:id', {
  action(params) {
    mount(MainLayout, {
      content: (<NotesContainer id={params.id}/>)
    })
  }
});

FlowRouter.route('/videos', {
  action() {
    mount(MainLayout, {
      content: (<MyVideos />)
    })
  }
});

FlowRouter.route('/about', {
  action() {
    mount(MainLayout, {
      content: (<About />)
    })
  }
});
