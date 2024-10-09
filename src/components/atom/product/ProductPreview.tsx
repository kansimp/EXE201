import styled from 'styled-components';
import { useState } from 'react';
import { breakpoints, defaultTheme } from '@styles/themes/default';

// Define the types for the preview images
interface PreviewImage {
    id: string;
    imgSource: string;
}

interface ProductPreviewProps {
    previewImages: PreviewImage[];
}

const ProductPreviewWrapper = styled.div`
    grid-template-columns: 72px auto;
    gap: 24px;

    @media (max-width: ${breakpoints.xl}) {
        gap: 16px;
    }

    @media (max-width: ${breakpoints.sm}) {
        gap: 12px;
        grid-template-columns: 42px auto;
    }

    @media (max-width: ${breakpoints.xs}) {
        grid-template-columns: 100%;
    }

    .preview-items {
        @media (max-width: ${breakpoints.xs}) {
            width: 80%;
            margin-right: auto;
            margin-left: auto;
            order: 2;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
        }
    }

    .preview-item {
        width: 70px;
        height: 70px;
        overflow: hidden;
        border-radius: 8px;
        cursor: pointer;
        transition: ${defaultTheme.default_transition};

        @media (max-width: ${breakpoints.sm}) {
            width: 40px;
            height: 40px;
        }

        &:hover {
            opacity: 0.9;
            outline: 1px solid ${defaultTheme.color_gray};
        }

        &-wrapper {
            padding-top: 4px;
            padding-bottom: 4px;

            @media (max-width: ${breakpoints.xs}) {
                display: flex;
                justify-content: center;
            }
        }
    }

    .preview-display {
        height: 600px;
        overflow: hidden;

        @media (max-width: ${breakpoints.md}) {
            height: 520px;
        }

        @media (max-width: ${breakpoints.sm}) {
            height: 400px;
        }

        @media (max-width: ${breakpoints.xs}) {
            height: 320px;
        }
    }
`;

const ProductPreview: React.FC<ProductPreviewProps> = ({ previewImages }) => {
    const [activePreviewImage, setActivePreviewImage] = useState<string>(previewImages[0].imgSource);

    const handlePreviewImageChange = (previewImage: string) => {
        setActivePreviewImage(previewImage);
    };

    return (
        <ProductPreviewWrapper className="grid items-center">
            <div className="preview-items w-full">
                {previewImages.map((previewImage) => (
                    <div
                        className="preview-item-wrapper"
                        key={previewImage.id}
                        onClick={() => handlePreviewImageChange(previewImage.imgSource)}
                    >
                        <div className="preview-item">
                            <img src={previewImage.imgSource} alt="" className="object-fit-cover" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="preview-display">
                <img src={activePreviewImage} className="object-fit-cover w-full h-full" alt="" />
            </div>
        </ProductPreviewWrapper>
    );
};

export default ProductPreview;
