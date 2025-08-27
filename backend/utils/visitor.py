def extract_visitor_type(response):
    response_lower = response.lower()
    if any(word in response_lower for word in ['recruiter', 'hiring', 'job', 'position']):
        return 'recruiter'
    elif any(word in response_lower for word in ['client', 'project', 'freelance', 'hire']):
        return 'client'
    elif any(word in response_lower for word in ['developer', 'engineer', 'technical', 'code']):
        return 'developer'
    return None