import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import fb from './formBlock.scss';
import u from '../../assets/utils.scss';

import TextField from 'material-ui/TextField';
import Button from '../../components/button/button';
import {Col, FlexContainer} from '../../components/layout/flex';

@cssModules([fb,u])

export class FormBlockText extends Component {
  static propTypes = {
    health: PropTypes.string
  };

  render() {
    const { styles, health } = this.props;
    const fb = styles[0];
    const u = styles[1];

    return (
      <article className={fb.textBlock}>
        <h3 className={fb.subHeader}>Самочувствие</h3>

        <TextField
          multiLine={true}
          rows={1}
          fullWidth={true}
          defaultValue={health}
        />

        <Button className={u.right} options={{inlineGreen: true}}>ЗАПИСАТЬ</Button>
      </article>
    )
  }
}

@cssModules([fb,u])

export class FormBlockWithParams extends Component {
  static propTypes = {
    data: PropTypes.shape({
      from: PropTypes.shape({
        id: PropTypes.number,
        doctor: PropTypes.string
      }),
      timeParameters: PropTypes.array
    })
  };

  render() {
    const { styles, data, postFunction } = this.props;
    const fb = styles[0];
    const u = styles[1];
    const doctor = data.from.doctor;
    if (data.timeParameters.length !== 0) {
      var paramBlocks = data.timeParameters.map(function (param) {
        var timeFields = param.time.map(function (field) {
          return (
            <TextField
              hintText={param.hint}
              fullWidth={true}
              floatingLabelText={field.type}
              defaultValue={field.value}
            />
          )
        });

        return (
          <Col xs={12} md={6} lg={4} options={{indents: true}}>
            <h4 className={fb.title}>{param.title}</h4>

            {timeFields}
          </Col>
        )
      });

      return (
        <article className={fb.textBlock}>
          <h3 className={fb.subHeader}>Контроль назначен: {doctor}</h3>

          <FlexContainer>
            {paramBlocks}
          </FlexContainer>

          <Button className={u.right} options={{inlineGreen: true}} clickFunction={postFunction}>ЗАПИСАТЬ</Button>
        </article>
      )
    }
    else {
      return (<div> </div>)
    }
  }
}
