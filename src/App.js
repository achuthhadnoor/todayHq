import React from "react";
import Icon from "react-icons-kit";
import {
    plus,
    trash2,
    list,
    code,
    bold,
    underline,
    italic,
    arrowLeft,
    arrowRight
} from "react-icons-kit/feather";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Airtable from 'airtable'
import { submitEmail, getRecords } from "./services/api";

const GlobalStyle = createGlobalStyle`
 ::-webkit-scrollbar {
      width: 14px;
      height: 14px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-track {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #222
       /* ${props => props.theme.background.accent}; */
    }
    ::-webkit-scrollbar-button {
      display: none;
      width: 0;
      height: 0;
    }
    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }

body{
      position:absolute;
      height:100%;
      width:100%;
      display:flex; 
      font-family:sans-serif; 
      margin:0;
      padding:0;
      background:${props => props.theme.background.primary};
      /* #ffb74d; */
      color:#121212;
    }
    #root{
      width:100%;
      display:flex;
      flex-direction:column;
      position:relative;
    }
a{
  color:inherit;
  text-decoration:none;
}
`;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            theme: {
                dark: {
                    background: "#fff",
                    color: "#121212",
                    accent: "#121212"
                }
            },
            email: '',
            emailList: [],
            hideemail: false
        };
    }
    componentDidMount() {
        getRecords().then(e => {
            this.setState({ emailList: e })
        })
    }
    submit = e => {
        e.preventDefault();
        submitEmail(this.state.email).then(e => {
            this.setState({ email: '', hideemail: true })
        })
    };
    onChange = (e) => {
        this.setState({ email: e.target.value })
    }
    render() {
        return (
            <ThemeProvider theme={this.state.theme.dark}>
                <GlobalStyle />
                <Wrapper>
                    <Header>
                        <Logo>TodayHQ.</Logo>
                        <span style={{ flex: 1 }} />
                        <Request href="#request">Request Access</Request>
                    </Header>
                    <main style={{ display: "flex", flexDirection: "column" }}>
                        <section style={{ flex: 1 }}>
                            <Title>Distraction free minimal notes app.</Title>

                            <Form onSubmit={this.submit} center>
                                {
                                    this.state.hideemail ? "Email Successfully Submitted" :
                                    <>
                                        <Input placeholder="Join the list..." value={this.state.email} onChange={this.onChange} />
                                        <SubmitButton>
                                            <IconView
                                                icon={arrowRight}
                                                style={{ fontSize: 24 }}
                                                onClick={this.submit}
                                            />
                                        </SubmitButton>
                                    </>
                                    }
                            </Form>
                            <Editor>
                                <div>
                                    <Traffic>
                                        <span className="red" />
                                        <span className="yellow" />
                                        <span className="green" />
                                    </Traffic>
                                    <EditorH>
                                        <Move />
                                        <IconView icon={plus} />
                                        <EditorO>
                                            <IconView icon={bold} />
                                            <IconView icon={italic} />
                                            <IconView icon={underline} />
                                            <IconView icon={code} />
                                            <IconView icon={list} />
                                        </EditorO>
                                        <div>
                                            <IconView icon={trash2} />
                                        </div>
                                    </EditorH>
                                </div>
                                <EditorB contentEditable="true">
                                    <h4>Remote design teams</h4>
                                    <p>
                                        Now, there’s a new wave of creative work emerging. It’s
                                        transforming how people around the world share their
                                        inventiveness and find access to professional opportunities.
                                        Remote work is leveling the playing field for people
                                        everywhere.
                  </p>
                                </EditorB>
                                <EditorH>
                                    <IconView icon={arrowLeft} />
                                    <Indicator>
                                        <span className="active" />
                                        <span />
                                        <span />
                                        <span />
                                    </Indicator>
                                    <IconView icon={arrowRight} />
                                    <span style={{ flex: 1 }} />
                                    <Wordcount>253 Characters 38 words 4 lines</Wordcount>
                                </EditorH>
                            </Editor>
                        </section>
                        <section>
                            <h2> Features</h2>
                            <p style={{ fontSize: 24, fontStyle: "itallic", color: "#aaa" }}>
                                Rich Editor <br />
                                Multiple Notes <br />
                                Quick keyboard shortcuts <br />
                            </p>
                        </section>
                        <section id="access">
                            <h1>Request Access</h1>
                            <Form onSubmit={this.submit} >
                                          {
                                    this.state.hideemail ? "Email Successfully Submited" :
                                    <>
                                        <Input placeholder="Join the list..." value={this.state.email} onChange={this.onChange} />
                                        <SubmitButton>
                                            <IconView
                                                icon={arrowRight}
                                                style={{ fontSize: 24 }}
                                                onClick={this.submit}
                                            />
                                        </SubmitButton>
                                    </>
                                    }
                            </Form>
                        </section>
                    </main>

                    <footer>
                        Made with <span role="img" aria-label="heart">♥️</span> by{" "}
                        <a target="_blank" rel="noopener noreferrer" href="https://achuth.now.sh">
                            Achuth Hadnoor
            </a>
                    </footer>
                </Wrapper>
            </ThemeProvider>
        );
    }
}
export default App;

const Wrapper = styled.div`
              display: flex;
              flex-direction: column;
              max-width: 1080px;
              margin: auto;
              height: 100%;
              width: 100%;
              font-family: sans-serif;
  main {
                    padding: 10px;
              }
              line-height: 2;
  footer {
                    text - align: center;
                width: 100%;
              }
            `;
const Header = styled.header`
              display: flex;
              align-content: center;
              padding: 32px 10px;
            `;
const Logo = styled.span`
              font-family: monospace;
              font-size: 24px;
            `;

const Request = styled.a`
              border: none;
              /* border: 1px solid #121212; */
              color: #121212;
              border-radius: 5px;
              /* color: #fff; */
              background: transparent;
              padding: 5px 15px;
              cursor: pointer;
              font-size: 18px;
              outline: none;
            `;

const Title = styled.p`
              font-size: 24px;
              text-align: center;
              padding-bottom: 20px;
            `;

const Editor = styled.div`
              max-width: 600px;
              padding: 10px;
              box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
              border-radius: 10px;
              margin: auto;
            `;

const Traffic = styled.div`
              display: flex;
            .red {
                    background: #e85c54;
                   }
              .yellow {
                    background: #f2bd2c;
                    }
            .green {
                    background: #61cb44;
                    }
            span {
                    display: block;
                    height: 15px;
                    width: 15px;
                    border-radius: 25px;
                    margin: 0px 5px;
                    cursor: pointer;
                }
            `;
const EditorO = styled.div`
              flex: 1;
              align-items: center;
              text-align: center;
              user-select: none;
              cursor: pointer;
  i:hover {
                    background: rgba(0, 0, 0, 0.1);
                border-radius: 5px;
              }
            `;
const EditorH = styled.div`
              display: flex;
              align-items: center;
            `;
const Move = styled.span``;

const IconView = styled(Icon)`
              padding: 5px;
              cursor: pointer;
            `;

const Indicator = styled.div`
              display: flex;
              align-items: ceter;
              padding: 5px;
  span {
                    display: block;
                height: 5px;
                width: 5px;
                background: rgba(0, 0, 0, 0.2);
                margin-left: 5px;
                border-radius: 50%;
              }
  .active {
                    background: #121212;
              }
            `;

const Wordcount = styled.div`
              font-size: 9px;
            `;
const EditorB = styled.div`
              outline: none;
            `;
const Input = styled.input`
              border: none;
              padding: 10px 15px;
              border: 1px solid #121212;
              outline: none;
              font-size: 18px;
              border-radius:10px 0px 0px 10px;
              flex:1;
              max-width:250px;
            `;

const SubmitButton = styled.button`
                display: inline-block;
                font-size: 24px;
                padding: 5px 15px;
                background: #121212;
                color: #fff;
                border-radius: 0px 10px 10px 0px;
                border:none;
`
const Form = styled.form`
    display:flex;
    align-items: center;
    justify-content:${props => props.center ? 'center' : 'left'};
    padding-bottom: 32px; 
`