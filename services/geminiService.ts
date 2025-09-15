
import { GoogleGenAI, Type } from "@google/genai";
import type { Article } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const articleSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'SEO에 최적화된, 80자 이내의 매력적인 한국어 아티클 제목'
    },
    slug: {
      type: Type.STRING,
      description: 'URL에 사용될, 영어 소문자와 하이픈(-)으로만 구성된 짧은 슬러그'
    },
    metaDescription: {
      type: Type.STRING,
      description: '검색 결과에 표시될, 160자 이내의 한국어 아티클 요약 설명'
    },
    markdownContent: {
      type: Type.STRING,
      description: `
      Markdown 형식의 한국어 아티클 본문. 다음 규칙을 반드시 준수해야 합니다:
      - 전체 내용은 500자 이상으로 작성합니다.
      - 아티클 제목을 최상단에 H1(#)으로 포함합니다.
      - 주요 소제목은 H2(##)를 사용합니다.
      - 세부 소제목은 H3(###)를 사용합니다.
      - 문단을 나누어 가독성을 높입니다.
      - 핵심 키워드를 본문 전체에 자연스럽게 분배하여 포함합니다.`
    }
  },
  required: ['title', 'slug', 'metaDescription', 'markdownContent']
};

export const generateArticle = async (topic: string, keywords: string[]): Promise<Article> => {
  const prompt = `
  주제: "${topic}"
  핵심 키워드: "${keywords.join(', ')}"

  위 주제와 키워드를 사용하여, 고불소치약에 대한 SEO에 최적화된 전문적인 한국어 아티클을 생성해줘. 
  독자는 구강 건강에 관심이 많은 일반인이야. 전문 용어는 쉽게 풀어서 설명하고, 신뢰감을 주는 어조로 작성해줘.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: articleSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    if (
      !parsedResponse.title ||
      !parsedResponse.slug ||
      !parsedResponse.metaDescription ||
      !parsedResponse.markdownContent
    ) {
      throw new Error("AI 응답에서 필수 필드가 누락되었습니다.");
    }
    
    // Slug validation and cleaning
    const cleanedSlug = parsedResponse.slug
      .toLowerCase()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/[^\w-]+/g, '')   // Remove all non-word chars
      .replace(/--+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')        // Trim - from start of text
      .replace(/-+$/, '');       // Trim - from end of text


    const newArticle: Article = {
      ...parsedResponse,
      slug: cleanedSlug || `article-${Date.now()}`, // fallback slug
      generatedDate: new Date().toISOString().split('T')[0],
    };

    return newArticle;

  } catch (error) {
    console.error("Error generating article with Gemini:", error);
    throw new Error("Failed to generate article. The AI model may be temporarily unavailable.");
  }
};
