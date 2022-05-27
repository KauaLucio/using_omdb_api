import styled from 'styled-components';

type ContainerProps = {
  isFlexible?: boolean
}

export const Container = styled.div`
  ${(props: ContainerProps) => props.isFlexible ? `
  display: flex;
  align-items: center;
  justify-content: space-between;
  ` : ""}
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`