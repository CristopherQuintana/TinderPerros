import { Alert, Card, CardActions, CardContent, CardMedia, Collapse, IconButton, styled } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './style.css'
import { useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardPerro(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    return (
        <>    
          {props.error && <Alert severity="error">ese perro no existe</Alert>}
          <Card>
            <CardMedia component="img" image={props.url} className="tamaño-perro" />
            <CardContent>
              Nombre: {props.nombre}
              {props.content}
            </CardContent>
            <CardActions disableSpacing>
              {props.buttons}
              {props.expand && <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
              </ExpandMore>}
            </CardActions>
            {props.expand && <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>{props.hidden}</CardContent>
              </Collapse>}
          </Card>
        </>
      );
}