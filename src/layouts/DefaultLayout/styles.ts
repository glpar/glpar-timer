import styled from "styled-components";

export const LayoutContainer = styled.div`
    max-width: 74rem;
    min-height: calc(100vh - 10rem);
    margin: 5rem auto;
    padding: 2.5rem;

    background: ${(props) => props.theme["gray-800"]};
    border-radius: 8px;

    display: flex;
    flex-direction: column;

    @media (max-height: 650px) {
        min-height: calc(100vh - 2rem);
        margin: 1rem auto;
        padding: 1.5rem 2rem;
    }

    @media (max-width: 600px) {
        min-height: 100vh;
        margin: 0;
        padding: 1.5rem 1rem;
        border-radius: 0;
    }
`;
