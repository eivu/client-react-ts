import { useSearchParams } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer} from '../../layout/DefaultLayout';
import { AlphabetMenu } from '../../layout/AlphabetMenu';
import { useState, useEffect, FC } from 'react';
import api from '../../services/api.config';
import { MiniLoader } from '../../components/Loader';
import { PaginationMenu } from '../../layout/PaginationMenu';
import { MetadatumEntry } from '../../components/MetadatumEntry';

const MetadataIndex: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [letter, setLetter] = useState<string>(searchParams.get('letter') || '');
  const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('pageNum')) || 1);
  const [metadata, setMetadata] = useState<Metadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<any>({});
  const [responseError, setResponseError] = useState<string>('');
  
  function handlePageChange(pageNum: number) {
    setLoading(true);
    setPageNum(pageNum);
    setSearchParams({ pageNum: pageNum.toString(), letter: letter });
  }

  function handleLetterChange(letter: string) {
    setLoading(true);
    setLetter(letter);
    setPageNum(1);
    setSearchParams({ pageNum: '1', letter: letter });
  }

  useEffect(() => {
    api.get('/metadata', {
      params: { page: pageNum, category: null, delicate: false, letter: letter }}
    ).then((response) => {
      setMetadata(response.data.metadata);
      setMeta(response.data.meta);
      setLoading(false);
      console.log(response.data);
    }).catch((error) => {
      setLoading(false);
      setResponseError(error.message);  
      console.log("error", responseError)
    })
  },[pageNum, letter])


  return (
    <DefaultLayout>
      <ContentHeader>
        <span>::Metadata</span>
      </ContentHeader>
      <ContentContainer>
      {
        loading ? <MiniLoader /> : (
          <>
            <AlphabetMenu activeLetter={letter} collection="metadata" handleLetterChange={handleLetterChange} />
            <div id="metadata-list" className="list pt-10">
              {metadata.map((metadatum) => (
                <div className="entry" key={`metadatum-entry-${metadatum.id}`}>
                  <MetadatumEntry metadatum={metadatum} />
                </div>
              ))}
            </div>
          </>
        )
      }
      </ContentContainer>
    {
        !loading &&
          <PaginationMenu
            pageNum={pageNum}
            totalPages={meta.totalPages}
            handlePageChange={handlePageChange}
            size={12} />
      }
    </DefaultLayout>
  );
};

export default MetadataIndex;
