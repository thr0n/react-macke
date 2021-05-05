import * as React from "react";
import { InputNumber, Button, Form } from "antd";

const FormItem = Form.Item;

class DebugToolBase extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    const dices = this.props.diceStates;
    const formScores = Object.values(this.props.form.getFieldsValue());

    dices.map((dice, index) => {
      dice.score = formScores[index];
    });

    this.props.onUpdate(dices);
  }

  createStreet() {
    this.props.form.setFieldsValue({
      "dice-score-0": 1,
      "dice-score-1": 2,
      "dice-score-2": 3,
      "dice-score-3": 4,
      "dice-score-4": 5,
    });
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    return (
      <div>
        <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
          {this.props.diceStates.map((diceStates, index) => {
            return (
              <FormItem key={`dice-score-${index}`}>
                {getFieldDecorator(`dice-score-${index}`, {
                  initialValue: this.props.diceStates[index].score,
                  rules: [{ required: true, message: "Missing value!" }],
                })(<InputNumber max={6} min={1} />)}
              </FormItem>
            );
          })}
          <FormItem>
            <Button
              type="primary"
              onClick={() => this.createStreet()}
              style={{ marginRight: "5px" }}
            >
              Straße
            </Button>
            <Button type="primary" htmlType="submit">
              Übernehmen
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export const DebugTool = Form.create()(DebugToolBase);
