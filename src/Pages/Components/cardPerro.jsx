import { Alert, Card, CardActions, CardContent, CardMedia, Collapse, IconButton, LinearProgress, styled } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './style.css'

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

    return (
        <>
          <Card>
            {props.loading && <LinearProgress/>}    
            {props.error && <Alert severity="error">ese perro no existe</Alert>}
            <CardMedia component="img" image={props.url} className="tamaño-perro"/>
            <CardContent>
              Nombre: {props.nombre}
              {props.content}
            </CardContent>
            <CardActions disableSpacing>
              {props.buttons}
              {props.expand && <ExpandMore
                expand={props.expanded}
                onClick={props.onExpand}
                aria-expanded={props.expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
              </ExpandMore>}
            </CardActions>
            {props.expand && <Collapse in={props.expanded} timeout="auto" unmountOnExit>
            <CardContent>{props.hidden}</CardContent>
              </Collapse>}
          </Card>
        </>
      );
}