import React, { Fragment } from "react";
import { Panel } from "./style";
import { iconStyle, tableStyle, Container, Picture } from "./style";
import { Person } from "@material-ui/icons";
import { css } from "emotion";

export default ({ members, theme_color, gridArea }) => {
  return (
    <Container gridArea={gridArea}>
      <div className="MembersContainer">
        {members &&
          members.map((element, index) => {
            const { name, surname } = element;
            return (
              <div className="Member">
                {element.github_picture ? (
                  <Picture
                    src={element.github_picture}
                    theme_color={theme_color}
                    className={css`
                      justify-self: center;
                    `}
                  />
                ) : (
                  <Person
                    style={iconStyle}
                    className={css`
                      justify-self: center;
                    `}
                  />
                )}
                <div className="Data">
                  {element.name} {name.length > 15 && <br />}
                  {element.surname}
                </div>
              </div>
            );
          })}
      </div>
    </Container>
  );
};
