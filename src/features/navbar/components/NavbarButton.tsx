import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

type Props = {
    text?: string, 
    to: string, 
    onPressed?: Function
}

export default function NavbarButton(props: Props) { 
    if (props.onPressed != null) {
        props.onPressed()
    }
    return (
        <Button>
            <Link to={props.to}>
                {props.text}
            </Link>
        </Button>
    )
}

