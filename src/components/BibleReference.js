import React, { useContext } from 'react'
import useEffect from 'use-deep-compare-effect'
import BibleReference, { useBibleReference } from 'bible-reference-rcl'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { StoreContext } from '@context/StoreContext'
import { BIBLES_ABBRV_INDEX } from '@common/BooksOfTheBible'

const useStyles = makeStyles((theme) => ({
  underline: {
    '&:hover:not(.Mui-disabled):before': { borderBottom: '2px solid white' },
    '&:before': { borderBottom: '1px solid white' },
    '&:after': { borderBottom: '2px solid white' },
  },
}))

function BibleReferenceComponent(props) {
  const classes = useStyles()
  const {
    state: {
      bibleReference: {
        bookId, chapter, verse,
      },
      supportedBibles,
    },
    actions: {
      onReferenceChange
    },
  } = useContext(StoreContext)

  console.log("BEFORE uBR: ", bookId, chapter, verse)
  const { state, actions } = useBibleReference({
    initialBook: bookId ? bookId : 'mat',
    initialChapter: chapter ? chapter : '1',
    initialVerse: verse ? verse : '1',
    onChange: onReferenceChange,
  })

  useEffect(() => {
    console.log("CHANGING BR 1!!!!", bookId, chapter, verse)
    if (bookId && chapter && verse && ((state.bookId !== bookId) || (state.chapter !== chapter) || (state.verse !== verse))) {
      console.log("CHANGING BR 2!!!!", bookId, chapter, verse)
      // update reference if external change (such as user log in causing saved reference to be loaded)
      actions.goToBookChapterVerse(bookId, chapter, verse)
    }
  }, [{
    bookId, chapter, verse,
  }])

  useEffect(() => {
    if (supportedBibles?.length) {
      actions.applyBooksFilter(supportedBibles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportedBibles])

  return (
    <BibleReference
      status={state}
      actions={actions}
      inputProps={{ classes }}
      style={{ color: '#ffffff' }}
    />
  )
}

export default BibleReferenceComponent
