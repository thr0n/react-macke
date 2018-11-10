import * as React from "react";
import { Form, Button, Icon, Input } from "antd";

const FormItem = Form.Item;

class PlayerManagerBase extends React.Component {
  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(keys.length);
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSave(values.players)
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };

    getFieldDecorator("keys", {
      initialValue: []
    });

    const keys = getFieldValue("keys");
    const formItems = keys.map((key, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Spieler:" : ""}
          required={false}
          key={key}
        >
          {" "}
          {getFieldDecorator(`players[${key}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Plase input player's name or delete this field."
              }
            ]
          })(
            <Input
              placeholder="Spielername"
              style={{ width: "60%", marginRight: 8 }}
            />
          )}{" "}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(key)}
            />
          ) : null}
        </FormItem>
      );
    });

    return (
      <div style={{marginTop: "40px", backgroundColor: "lightyellow"}}>
        <h2>Bitte füge mindestens zwei Spieler hinzu!</h2>
        <Form onSubmit={this.handleSubmit}>
          {" "}
          {formItems}{" "}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
              <Icon type="plus" /> Spieler hinzufügen{" "}
            </Button>{" "}
          </FormItem>{" "}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              Starten{" "}
            </Button>{" "}
          </FormItem>{" "}
        </Form>
      </div>
    );
  }
}

export const PlayerManger = Form.create()(PlayerManagerBase);
