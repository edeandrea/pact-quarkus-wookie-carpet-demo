import styled from "styled-components"
import {useEffect, useState} from "react";
import rough from "roughjs/bundled/rough.cjs.js";

const arrowWidth = 180;

const InteractionDisplay = styled.div`
  display: flex;
  flex-direction: row;
`

const Event = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 1rem;
  font-style: italic;

`

const Component = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: transparent;
  height: 5rem;
  transition: all .5s ease;
  font-size: 1.25rem;
  text-align: center;
  letter-spacing: 1px;
  outline: none;
`

const Payload = styled.div`
  position: absolute;
  opacity: 0.8;
  background-color: white;
  font-size: 1rem;
  font-family: Monaco, Courier, monospace;;
`

const Anchor = styled.div`
  position: relative;
  width: ${arrowWidth}px;
  height: 0;
`

// If we don't set a height, this will take the width of the parent anchor, which is what we want
const Rough = styled.svg`
  position: absolute;
  left: 0;
  transform: ${props => props.center ? "translateY(-50%)" : "translateY(3px)"};

  ${props => props.shadow && `
    -webkit-filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, .7));
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, .7));

  &:hover {
    -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, .7));
    filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, .7));
  }
  `}
`
// This height adjustment is super-fragile and hand-tuned in the non-centering case, and depends on the relationship between the aspect ratio of the viewbox and the parent dimensions

const MethodName = styled.div`
  height: 20px
`

const eventLine = (id, isException) => {
    const svg = document.getElementById(id);
    const rc = rough.svg(svg);
    const node = rc.line(10, 0, 90, 0, {stroke: isException ? "crimson" : "black"});
    svg.appendChild(node);
    const arrowHead = rc.path("M85,-5l5,5l-5,5", {stroke: isException ? "crimson" : "black"})
    svg.appendChild(arrowHead)

}

const componentBox = (id) => {
    const svg = document.getElementById(id);
    const rc = rough.svg(svg);
    const node = rc.rectangle(10, 10, 180, 60);
    svg.appendChild(node);
}

const Interaction = ({interaction}) => {
    const eventSvg = "event-svg" + interaction.id;
    const componentSvg = "component-svg" + interaction.id
    const isException = interaction.payload.exception != null;

    useEffect(() => {
        eventLine(eventSvg, isException)
        componentBox(componentSvg)


    }, [eventSvg, componentSvg, isException])

    const [isOpen, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (

        <InteractionDisplay>
            <Event onMouseOver={handleOpen}
                   onMouseOut={handleClose} isException={isException}>
                <MethodName> {interaction.methodName}</MethodName>
                <Anchor id={"some-id"}>
                    <Rough center={true} id={eventSvg} viewBox="0 -15 100 30">
                    </Rough>
                </Anchor>
                <MethodName/> {/*Cheat and add centring padding with a div*/}
            </Event>


            <Component>

                <Anchor>
                    <Rough shadow={true} id={componentSvg} viewBox="0 0 200 80">
                    </Rough>
                </Anchor>
                {interaction.owningComponent}
                <Anchor/>
            </Component>

            {isOpen && (<Payload>
                {JSON.stringify(interaction.payload)}
            </Payload>)}
        </InteractionDisplay>
    );
};

export default Interaction;