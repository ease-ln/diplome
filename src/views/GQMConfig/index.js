import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';

import DnD from './GQM/DnD';
import Goal from './GQM/Goal';

class GQMConfig extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      goalId: -1,
    };
  }

  setGoalId = async (goalId) => {
    this.setState({ goalId: goalId })
  }

  render() {
    return (
      <Card>

        <CardHeader>
          <strong>GQM Configuration</strong>
        </CardHeader>

        <CardBody>
          <Goal setGoalId={this.setGoalId} />
          {this.state.goalId === -1 ?
            <span>Loading...</span>
            :
            <DnD goalId={this.state.goalId} />
          }
        </CardBody>

      </Card>
    )
  }
}

export default GQMConfig
