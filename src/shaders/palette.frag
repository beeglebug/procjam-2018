uniform sampler2D texture;
uniform sampler2D colorTable;
uniform float paletteIndex;

void main()
{
    vec2 pos = gl_TexCoord[0].xy;
    vec4 color = texture2D(texture, pos);
    vec2 index = vec2(color.r + paletteIndex, 0);
    vec4 indexedColor = texture2D(colorTable, index);
    gl_FragColor = indexedColor;
}
