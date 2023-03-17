import styled from "styled-components"

const OrderNumber = styled.span`
  font-size: 10px;
  color: grey;
`

const Carpet = ({carpet}) => {
    return (
        <div className="carpet-card">
            <p><OrderNumber>#{carpet.orderNumber}</OrderNumber>Your new carpet is
                a {carpet.colour ? `nice ${carpet.colour}` : "totally indescribable"} carpet. {carpet.colour ? `` : "(Sad wookie.)"}
            </p>
        </div>
    );
};

export default Carpet;
