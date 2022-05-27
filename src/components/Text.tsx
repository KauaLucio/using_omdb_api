import styled from 'styled-components';

type TextProps = {
  fontSize?: string
  fontWeight?: string
  marginB?: string
}

export const Text = styled.div`
  font-size: ${(props: TextProps) => props.fontSize || '18px'}
  font-weight: ${(props: TextProps) => props.fontWeight || 'bold'}
  margin-bottom: ${(props: TextProps) => props.marginB || '0'}
`;
