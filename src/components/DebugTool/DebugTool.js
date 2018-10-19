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
    })

    this.props.onUpdate(dices)
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
          {this.props.diceStates.map((diceStates, index) => {
            return (
              <FormItem key={`dice-score-${index}`}>
                {getFieldDecorator(`dice-score-${index}`, {
                  initialValue: this.props.diceStates[index].score,
                  rules: [{ required: true, message: "Missing value!" }]
                })(<InputNumber max={6} min={1}/>)}
              </FormItem>
            );
          })}

          <FormItem>
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
