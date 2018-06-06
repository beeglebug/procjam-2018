import collideCircleRect from './collision/collideCircleRect'
// l1 - line start, l2 - line end, x - point
// perp() returns vec2(y,-x)  -- a perpendicular vector
// dot() returns v1.x * v2.x + v1.y * v2.y  -- it's the 2D vector dot product
// normalized() returns vec2(x/length,y/length), where length = sqrt(x*x+y*y)
ln = ( l2 - l1 ).perp().normalized();
distance = dot( ln, x ) - dot( ln, l1 );
// positive distance means that point's on the left side, negative - on the right



// TODO inverted collision checks, eg
const collideRectCircle = (rect, circle, response) => collideCircleRect(circle, rect, response)

