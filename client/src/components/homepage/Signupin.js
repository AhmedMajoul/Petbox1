import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import Signupin from './Signupin.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const SplitButton = (props) => {
  return (
    <ButtonGroup className="signup-signin">
      <Button color="success">Se connecter</Button>
      <Button color="success">S'inscrire</Button>
    </ButtonGroup>
  );
}

export default SplitButton; 