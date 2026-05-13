// Editorial pull-quote with the brand's red left rule. Uses
// .bh-pull-quote from the design system so the typography is locked
// to the platform-wide scale.

export default function PullQuote({ body, attribution }) {
  if (!body) return null
  return (
    <figure style={{ margin: '24px 0' }}>
      <blockquote className="bh-pull-quote" cite="" style={{ margin: 0 }}>
        {body}
      </blockquote>
      {attribution && (
        <figcaption className="bh-byline" style={{
          marginTop: 10,
          paddingLeft: 23,
        }}>
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
