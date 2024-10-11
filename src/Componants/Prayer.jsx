
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard({image,title,time}) {
  return (
    <Card sx={{ width: 150 }}>
      <CardMedia
        sx={{ height: 100 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <h4>
          {title}
        </h4>
        <Typography variant="h3" sx={{ color: 'text.secondary'}} style={{fontWeight:"350"}}>
          {time}
        </Typography>
      </CardContent>

    </Card>
  );
}