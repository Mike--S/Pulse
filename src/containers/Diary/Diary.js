import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import _ from 'lodash';

import * as diaryActions from '../../actions/diary/diary';

import d from './diary.scss';
import u from '../../assets/utils.scss';

import Button from '../../components/button/button';
import {Col, FlexContainer} from '../../components/layout/flex';
import TextField from 'material-ui/TextField';

@cssModules([d, u])

export default class Diary extends Component {
  static propTypes = {

  };

  getTimeBlockData(ids, timeBlocksData) {
    return _.filter(timeBlocksData, (timeBlock) => {
      return _.includes(ids, timeBlock.type);
    });
  }

  componentWillMount() {
    this.props.loadDiary();
  }

  render() {
    const { styles, diary } = this.props;
    const d = styles[0];
    const u = styles[1];

    let paramBlocks,
      controlBlocks,
      timeBlocks;

    let diaryData = diary.data;
    let isFetching = diary && diary.isFetching;

    if (isFetching === undefined || isFetching) {
      return(<h2>Loading...</h2>)
    }
    else {
      if (Object.keys(diaryData.params).length !== 0) {

        paramBlocks = _.map(diaryData.params,(param) => {
          if(Object.keys(diaryData.times).length !==0 ) {
            let timeBlocksData = this.getTimeBlockData(param.time, diaryData.times);

            timeBlocks = _.map(timeBlocksData, (field, index)=> {

              return (
                <TextField
                  key={index}
                  hintText={param.hint}
                  fullWidth={true}
                  floatingLabelText={field.label}
                  defaultValue={field.value}
                  errorText=""
                />
              )
            })
          }

          return(
            <Col key={param.id} xs={12} md={6} lg={4} options={{indents: true}}>
              <h4 className={d.title}>{param.title}</h4>

              {timeBlocks}
            </Col>
          )
        });
      }

      if (Object.keys(diaryData.controlBlock).length !== 0) {
        controlBlocks = _.map(diaryData.controlBlock, (controlBlock, index) => {

          return (
            <form key={index} className={d.textBlock}>
              <h3 className={d.subHeader}>Контроль назначен: {controlBlock.doctor}</h3>

              <FlexContainer>
                {paramBlocks}
              </FlexContainer>

              <Button className={u.right} options={{inlineGreen: true}} clickFunction={this.props.postDiaryParams}>ЗАПИСАТЬ</Button>
            </form>

          )
        });
      }

      return (
        <div>
          <h2 className={d.header} >24 Октября 2014, Среда</h2>

          <form className={d.textBlock}>
            <h3 className={d.subHeader}>Самочувствие</h3>

            <TextField
              id={"health"}
              multiLine={true}
              rows={1}
              fullWidth={true}
              defaultValue={diaryData.healthBlock.text}
            />

            <Button className={u.right} options={{inlineGreen: true}}>ЗАПИСАТЬ</Button>
          </form>

          {controlBlocks}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    diary: state.diary
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(diaryActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
