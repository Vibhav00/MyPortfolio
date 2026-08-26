import React from 'react'
import Article from '/src/components/wrappers/Article.jsx'
import InfoBlock from '/src/components/generic/InfoBlock.jsx'
import { useParser } from '/src/helpers/parser.js'
import { useLanguage } from '/src/providers/LanguageProvider.jsx'

function ArticleInfoBlock({ data }) {
  const parser = useParser()

  const parsedData = parser.parseArticleData(data)
  const items = parsedData.items
  parser.sortArticleItemsByDateDesc(items)
  const parsedItems = parser.parseArticleItems(items)
  const { getString } = useLanguage()

  return (
    <>
      <Article className={`article-info-block`} title={parsedData.title}>
        {parsedItems.map((item, key) => (
          <InfoBlock
            key={key}
            img={item.img}
            faIcon={item.faIcon}
            faIconColors={item.faIconColors}
            html={item.text}
          />
        ))}
      </Article>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <button className="btn btn-xl btn-highlight" onClick={handleDownload}>
          {getString('resume')}
        </button>
      </div>
    </>
  )
}

const handleDownload = () => {
  const resumeUrl =
    'https://drive.google.com/file/d/1pdxspRAF54KhIF8B0FcuiKYo3_05a2sq/view?usp=sharing' // Change this to your actual file path
  const a = document.createElement('a')
  a.href = resumeUrl
  a.download = 'Vibhav_Kumar_Resume.pdf' // File name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default ArticleInfoBlock
