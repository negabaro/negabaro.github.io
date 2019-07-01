```
validateDOMNesting(...): <div> cannot appear as a descendant of <p>.
```

https://stackoverflow.com/questions/41928567/div-cannot-appear-as-a-descendant-of-p

원인:

his:
p태그 밑에div못오는구나..

```
<p>
   <div>...</div>
</p>
```

import Typography from "material-ui/Typography";

```
 <Typography component="p">
            <LinesEllipsis
              text={this.props.title || ""}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
            {this.props.start_time} - {this.props.end_time}
          </Typography>
```

```
 <Typography component={"span"}>
            <LinesEllipsis
              text={this.props.title || ""}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
            {this.props.start_time} - {this.props.end_time}
          </Typography>
```
