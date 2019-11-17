import React, { useState, useEffect, Fragment } from "react";

import { connect } from "react-redux";
import { SmsFailed } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { css, keyframes } from "emotion";
import dateFns from "date-fns";
import {
  ThumbUp,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied
} from "@material-ui/icons";

import { newsReadRequest, newsUpdateRequest } from "../../../actions";

import { StyledSpinner, Label, TopBar, Picture, StyledTooltip } from "./style";
import { fabAddStyle, iconAddStyle } from "./style";
import { PostForm } from "../../../components";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";

const show = keyframes`
  from {
    transform: translateY(30px) scale(0.8);
    opacity: 0.4;
  }
`;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const News = props => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [update, setUpdate] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    props.readNews();
  }, [update]);

  const { news, users, user } = props;

  if (!news || news.length === 0) {
    return <StyledSpinner />;
  }

  const sortedNews = [...news].sort((e1, e2) => {
    const date1 = new Date(e1.date);
    const date2 = new Date(e2.date);
    return dateFns.isAfter(date1, date2) ? -1 : 1;
  });

  return (
    <div>
      <TopBar>
        <Label>
          <SmsFailed />
          <span>News</span>
        </Label>
        <div className="Searchbar">
          <InputBase placeholder="Search…" style={{ width: "100%" }} />
          <SearchIcon />
        </div>
      </TopBar>
      <div
        className={css`
          display: grid;
          grid-gap: 50px;
          margin-left: 25vw;
          margin-right: 25vw;
          margin-top: 50px;
          margin-bottom: 100px;

          @media (max-width: 400px) {
            margin-left: 20px;
            margin-right: 20px;
          }
        `}
      >
        {sortedNews.map((e, i) => {
          const post_user = users.find(user => user.id === e.user_id) || {};
          const happy = e.users_happy || "";
          const wow = e.users_wow || "";
          const sad = e.users_sad || "";

          const isHappy = happy.split(",").includes(user.id);
          const isWow = wow.split(",").includes(user.id);
          const isSad = sad.split(",").includes(user.id);
          return (
            <div>
              <div
                key={i}
                className={css`
                  height: 100%;
                  min-height: 200px;
                  padding: 25px;
                  border-radius: 8px;
                  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
                  animation: ${show} 0.3s;
                  transition: all 0.1s ease-in-out;
                  background-color: white;
                  display: grid;
                  grid-template: "user title date" 50px "border border border" 1px "body body body" "info info info" / 50px 1fr 1fr;
                  grid-gap: 10px;

                  @media (max-width: 400px) {
                    width: 230px;
                  }
                `}
              >
                <div
                  className={css`
                    grid-area: user;
                    width: 30px;
                    align-self: center;
                  `}
                >
                  <Picture
                    src={post_user.github_picture}
                    name={post_user.name}
                  />
                </div>
                <div
                  className={css`
                    grid-area: title;
                    font-size: 28px;
                    align-self: center;
                  `}
                >
                  {e.title}
                </div>
                <div
                  className={css`
                    grid-area: body;
                    color: hsl(0, 0%, 50%);
                    line-height: 1.6;
                    padding-bottom: 20px;
                  `}
                >
                  {e.body}
                </div>
                {post_user.name !== "InnoBot" && (
                  <Fragment>
                    <div
                      className={css`
                        grid-area: info;
                        align-self: end;
                        display: flex;
                        align-items: center;
                        > span {
                          margin-left: 10px;
                        }
                      `}
                    >
                      <ThumbUp
                        className={css`
                          color: ${isHappy ? "#00336e" : "hsl(0, 0%, 50%)"};
                          cursor: pointer;
                          :hover {
                            color: #00336e;
                          }
                        `}
                      />
                      <span
                        className={css`
                          color: ${isHappy ? "#00336e" : "hsl(0, 0%, 60%)"};
                        `}
                      >
                        {e.reaction_happy > 0 && e.reaction_happy}
                      </span>
                    </div>
                    <div
                      className={css`
                        grid-area: info;
                        align-self: end;
                        margin-left: 70px;
                        display: flex;
                        align-items: center;
                        > span {
                          margin-left: 10px;
                        }
                      `}
                    >
                      <SentimentVerySatisfied
                        className={css`
                          color: ${isWow ? "#00336e" : "hsl(0, 0%, 50%)"};
                          cursor: pointer;
                          :hover {
                            color: #00336e;
                          }
                        `}
                      />
                      <span
                        className={css`
                          color: ${isWow ? "#00336e" : "hsl(0, 0%, 60%)"};
                        `}
                      >
                        {e.reaction_wow > 0 && e.reaction_wow}
                      </span>
                    </div>
                    <div
                      className={css`
                        grid-area: info;
                        align-self: end;
                        margin-left: 140px;
                        display: flex;
                        align-items: center;
                        > span {
                          margin-left: 10px;
                        }
                      `}
                    >
                      <SentimentVeryDissatisfied
                        className={css`
                          color: ${isSad ? "#00336e" : "hsl(0, 0%, 50%)"};
                          cursor: pointer;
                          :hover {
                            color: #00336e;
                          }
                        `}
                      />
                      <span
                        className={css`
                          color: ${isSad ? "#00336e" : "hsl(0, 0%, 60%)"};
                        `}
                      >
                        {e.reaction_sad > 0 && e.reaction_sad}
                      </span>
                    </div>
                  </Fragment>
                )}
                <div
                  className={css`
                    grid-area: date;
                    justify-self: end;
                    align-self: center;
                    color: hsl(0, 0%, 65%);

                    @media (max-width: 400px) {
                      display: none;
                    }
                  `}
                >
                  {e.date}
                </div>
                <div
                  className={css`
                    grid-area: border;
                    background-color: hsl(0, 0%, 90%);
                  `}
                />
              </div>
              {props.user.role === "ADMIN" && (
                <div
                  className={css`
                    @media (max-width: 400px) {
                      display: none;
                    }
                  `}
                />
              )}
            </div>
          );
        })}
        <StyledTooltip
          title={"Add post"}
          aria-label="Add"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <Link to="#">
            <Fab style={fabAddStyle}>
              <AddIcon style={iconAddStyle} />
            </Fab>
          </Link>
        </StyledTooltip>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          maxWidth={false}
          onClose={handleClose}
        >
          <PostForm
            setUpdate={setUpdate}
            update={update}
            handleClose={handleClose}
          />
        </Dialog>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const news = state.news.items;
  const users = state.users.items;
  const user = state.user;
  return {
    news,
    users,
    user
  };
};

const mapDispatchToProps = dispatch => ({
  readNews: () => dispatch(newsReadRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
