const contract =
  "dev-1693471936907-55840210347173";

State.init({ message: "" });

const messages = Near.view(contract, "get_messages", { limit: 100 });

// tagged template literal
const Message = styled.div`
  display: flex;
  gap: 1.2em;
`;

const SendControls = styled.div`
  display: flex;
  gap: 1em;
  margin: 0.5em;
`;

// src: url('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css')
const Wrapper = styled.div`
  @font-face {
    font-family: "FontAwesome";
    src: url("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/fonts/fontawesome-webfont.ttf?v=4.4.0");
    font-weight: normal;
    font-style: normal;
  }
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .fa-send:before {
    content: "\f1d8";
  }
`;

const sendMessage = () => {
  if (state.message.length != 0) {
    Near.call(contract, "send", { text: state.message });
  }
};

return (
  <>
    {messages.reverse().map((message) => (
      <Message>
        <Widget
          src="discom.testnet/widget/AccountProfile"
          props={{ accountId: message.author }}
        />
        <Widget
          src="one.testnet/widget/TimeAgo"
          props={{ blockHeight: message.block_height }}
        />
        <p>{message.text}</p>
      </Message>
    ))}
    <SendControls>
      <input
        type="text"
        onInput={(e) => State.update({ message: e.target.value })}
        value={state.message}
      />
      <Wrapper>
        <button
          onClick={() => {
            sendMessage();
          }}
        >
          <i className="fa fa-send"></i>
        </button>
      </Wrapper>
    </SendControls>
  </>
);
